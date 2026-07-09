import { NextRequest } from 'next/server'

// Mock data for development without DB
const mockListings = [
  {
    id: '1',
    slug: 'pacific-fiber-solutions-los-angeles',
    businessName: 'Pacific Fiber Solutions',
    city: 'Los Angeles',
    state: 'CA',
    category: ['FIBER', 'TELECOM'],
    services: ['Fusion Splicing', 'OTDR Testing', 'Aerial Fiber', 'Underground Repair'],
    phone: '(310) 555-0142',
    certifications: ['BICSI RCDD', 'FOA CFOT', 'OSHA 10'],
    emergencyService: true,
    rating: 4.8,
    reviewCount: 23,
    verified: true,
    yearsInBusiness: 12,
    description: 'Full-service fiber optic splicing and testing for OSP and ISP projects throughout Southern California.',
  },
  {
    id: '2',
    slug: 'lone-star-cable-splicing-dallas',
    businessName: 'Lone Star Cable Splicing',
    city: 'Dallas',
    state: 'TX',
    category: ['COPPER', 'TELECOM'],
    services: ['OSP Plant Splicing', 'Buried Cable Repair', 'Pedestal Work', 'Central Office'],
    phone: '(214) 555-0188',
    certifications: ['IBEW Local', 'OSHA 30'],
    emergencyService: true,
    rating: 4.6,
    reviewCount: 17,
    verified: true,
    yearsInBusiness: 8,
    description: 'Experienced copper and telecom cable splicing serving the DFW Metroplex for commercial and carrier clients.',
  },
  {
    id: '3',
    slug: 'northwest-splice-crew-seattle',
    businessName: 'Northwest Splice Crew',
    city: 'Seattle',
    state: 'WA',
    category: ['FIBER'],
    services: ['Fusion Splicing', 'Ribbon Fiber', 'FTTX Splicing', 'Emergency Repair'],
    phone: '(206) 555-0221',
    certifications: ['FOA CFOT', 'FOA CFOS'],
    emergencyService: true,
    rating: 4.9,
    reviewCount: 31,
    verified: true,
    yearsInBusiness: 15,
    description: 'Precision fusion splicing for single-mode and ribbon fiber. Serving Washington state and the Pacific Northwest.',
  },
  {
    id: '4',
    slug: 'sunshine-telecom-miami',
    businessName: 'Sunshine Telecom Services',
    city: 'Miami',
    state: 'FL',
    category: ['TELECOM', 'FIBER'],
    services: ['OSP Splicing', 'DSLAM Connections', 'Fiber to Node', 'Loop Testing'],
    phone: '(305) 555-0077',
    certifications: ['BICSI Technician', 'OSHA 10'],
    emergencyService: false,
    rating: 4.4,
    reviewCount: 9,
    verified: true,
    yearsInBusiness: 6,
    description: 'Telecom infrastructure splicing and fiber deployment services for South Florida carriers and contractors.',
  },
  {
    id: '5',
    slug: 'chicago-cable-specialists',
    businessName: 'Chicago Cable Specialists',
    city: 'Chicago',
    state: 'IL',
    category: ['COPPER', 'TELECOM'],
    services: ['Buried Copper Repair', 'Telephone Line Splicing', 'Vault Work', 'Central Office'],
    phone: '(312) 555-0155',
    certifications: ['IBEW', 'OSHA 30', 'Illinois Licensed'],
    emergencyService: true,
    rating: 4.7,
    reviewCount: 28,
    verified: true,
    yearsInBusiness: 22,
    description: 'Chicago-based copper and telecom cable splicers with decades of experience in OSP plant and central office environments.',
  },
  {
    id: '6',
    slug: 'atlanta-fiber-group',
    businessName: 'Atlanta Fiber Group',
    city: 'Atlanta',
    state: 'GA',
    category: ['FIBER'],
    services: ['Fusion Splicing', 'OTDR Testing', 'Splice Closure Installation', 'Dark Fiber'],
    phone: '(404) 555-0198',
    certifications: ['FOA CFOT', 'BICSI Technician'],
    emergencyService: true,
    rating: 4.5,
    reviewCount: 14,
    verified: false,
    yearsInBusiness: 5,
    description: 'Fiber optic fusion splicing and closure work for carriers, municipalities, and fiber build contractors in Georgia.',
  },
]

function filterListings(params: URLSearchParams) {
  let filtered = [...mockListings]

  const city = params.get('city')
  const state = params.get('state')
  const category = params.get('category')
  const emergency = params.get('emergency')

  if (city) {
    filtered = filtered.filter((l) =>
      l.city.toLowerCase().includes(city.toLowerCase()) ||
      l.state.toLowerCase() === city.toLowerCase()
    )
  }
  if (state) {
    filtered = filtered.filter((l) => l.state.toLowerCase() === state.toLowerCase())
  }
  if (category) {
    filtered = filtered.filter((l) => l.category.includes(category))
  }
  if (emergency === 'true') {
    filtered = filtered.filter((l) => l.emergencyService)
  }

  return filtered
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '100')

    // Try Prisma if DB is configured
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('USER:PASSWORD')) {
      const { prisma } = await import('@/lib/prisma')
      const where: Record<string, unknown> = { published: true }
      const city = searchParams.get('city')
      const state = searchParams.get('state')
      const category = searchParams.get('category')
      const emergency = searchParams.get('emergency')

      if (city) {
        // Map full state names to abbreviations so "Hawaii" finds state:"HI"
        const stateNameMap: Record<string, string> = {
          'alabama':'AL','alaska':'AK','arizona':'AZ','arkansas':'AR','california':'CA',
          'colorado':'CO','connecticut':'CT','delaware':'DE','florida':'FL','georgia':'GA',
          'hawaii':'HI','idaho':'ID','illinois':'IL','indiana':'IN','iowa':'IA','kansas':'KS',
          'kentucky':'KY','louisiana':'LA','maine':'ME','maryland':'MD','massachusetts':'MA',
          'michigan':'MI','minnesota':'MN','mississippi':'MS','missouri':'MO','montana':'MT',
          'nebraska':'NE','nevada':'NV','new hampshire':'NH','new jersey':'NJ','new mexico':'NM',
          'new york':'NY','north carolina':'NC','north dakota':'ND','ohio':'OH','oklahoma':'OK',
          'oregon':'OR','pennsylvania':'PA','rhode island':'RI','south carolina':'SC',
          'south dakota':'SD','tennessee':'TN','texas':'TX','utah':'UT','vermont':'VT',
          'virginia':'VA','washington':'WA','west virginia':'WV','wisconsin':'WI','wyoming':'WY',
        }
        const abbr = stateNameMap[city.toLowerCase()]
        if (abbr) {
          where.state = { equals: abbr, mode: 'insensitive' }
        } else {
          where.OR = [
            { city: { contains: city, mode: 'insensitive' } },
            { state: { equals: city, mode: 'insensitive' } },
          ]
        }
      }
      if (state) where.state = { equals: state, mode: 'insensitive' }
      if (category) where.category = { has: category }
      if (emergency === 'true') where.emergencyService = true

      const [listings, total] = await Promise.all([
        prisma.listing.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: [{ verified: 'desc' }, { rating: { sort: 'desc', nulls: 'last' } }, { reviewCount: 'desc' }],
        }),
        prisma.listing.count({ where }),
      ])

      return Response.json({ listings, total, page, totalPages: Math.ceil(total / limit) })
    }

    // Fallback to mock data
    const filtered = filterListings(searchParams)
    const total = filtered.length
    const paginated = filtered.slice((page - 1) * limit, page * limit)

    return Response.json({
      listings: paginated,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Listings API error:', error)
    return Response.json({ error: 'Failed to fetch listings' }, { status: 500 })
  }
}
