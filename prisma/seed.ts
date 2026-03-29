import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import * as dotenv from 'dotenv'

dotenv.config()

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

async function main() {
  console.log('Seeding database...')

  const listings = [
    {
      businessName: 'Pacific Fiber Solutions',
      city: 'Los Angeles', state: 'CA', zip: '90001',
      category: ['FIBER', 'TELECOM'],
      services: ['Fusion Splicing', 'OTDR Testing', 'Aerial Fiber', 'Underground Repair', 'FTTX Splicing'],
      phone: '(310) 555-0142',
      certifications: ['BICSI RCDD', 'FOA CFOT', 'OSHA 10'],
      description: 'Full-service fiber optic splicing and testing for OSP and ISP projects throughout Southern California.',
      emergencyService: true, rating: 4.8, reviewCount: 23, yearsInBusiness: 12,
    },
    {
      businessName: 'Lone Star Cable Splicing',
      city: 'Dallas', state: 'TX', zip: '75201',
      category: ['COPPER', 'TELECOM'],
      services: ['OSP Plant Splicing', 'Buried Cable Repair', 'Pedestal Work', 'Central Office Terminations'],
      phone: '(214) 555-0188',
      certifications: ['IBEW Local 20', 'OSHA 30'],
      description: 'Copper and telecom cable splicing serving the DFW Metroplex for commercial and carrier clients.',
      emergencyService: true, rating: 4.6, reviewCount: 17, yearsInBusiness: 8,
    },
    {
      businessName: 'Northwest Splice Crew',
      city: 'Seattle', state: 'WA', zip: '98101',
      category: ['FIBER'],
      services: ['Fusion Splicing', 'Ribbon Fiber Splicing', 'FTTX Splicing', 'Emergency Repair', 'OTDR Testing'],
      phone: '(206) 555-0221',
      certifications: ['FOA CFOT', 'FOA CFOS/H', 'Fujikura Certified'],
      description: 'Precision fusion splicing for single-mode and ribbon fiber. Serving Washington state and Pacific Northwest.',
      emergencyService: true, rating: 4.9, reviewCount: 31, yearsInBusiness: 15,
    },
    {
      businessName: 'Sunshine Telecom Services',
      city: 'Miami', state: 'FL', zip: '33101',
      category: ['TELECOM', 'FIBER'],
      services: ['OSP Splicing', 'DSLAM Connections', 'Fiber to Node', 'Loop Testing'],
      phone: '(305) 555-0077',
      certifications: ['BICSI Technician', 'OSHA 10'],
      description: 'Telecom infrastructure splicing and fiber deployment for South Florida carriers and contractors.',
      emergencyService: false, rating: 4.4, reviewCount: 9, yearsInBusiness: 6,
    },
    {
      businessName: 'Chicago Cable Specialists',
      city: 'Chicago', state: 'IL', zip: '60601',
      category: ['COPPER', 'TELECOM'],
      services: ['Buried Copper Repair', 'Telephone Line Splicing', 'Splice Vault Work', 'Central Office'],
      phone: '(312) 555-0155',
      certifications: ['IBEW Local 134', 'OSHA 30', 'Illinois EC License'],
      description: 'Decades of copper and telecom splicing experience in OSP plant and central office environments.',
      emergencyService: true, rating: 4.7, reviewCount: 28, yearsInBusiness: 22,
    },
    {
      businessName: 'Atlanta Fiber Group',
      city: 'Atlanta', state: 'GA', zip: '30301',
      category: ['FIBER'],
      services: ['Fusion Splicing', 'OTDR Testing', 'Splice Closure Installation', 'Dark Fiber Splicing'],
      phone: '(404) 555-0198',
      certifications: ['FOA CFOT', 'BICSI Technician'],
      description: 'Fiber optic fusion splicing and closure work for carriers, municipalities, and fiber build contractors in Georgia.',
      emergencyService: true, rating: 4.5, reviewCount: 14, yearsInBusiness: 5,
    },
    {
      businessName: 'Rocky Mountain Fiber Works',
      city: 'Denver', state: 'CO', zip: '80201',
      category: ['FIBER', 'TELECOM'],
      services: ['Fusion Splicing', 'Underground Fiber Repair', 'Aerial Splicing', 'ISP Buildouts'],
      phone: '(720) 555-0143',
      certifications: ['FOA CFOT', 'OSHA 10'],
      description: 'Denver-based fiber and telecom splicing serving Colorado and surrounding mountain states.',
      emergencyService: false, rating: 4.3, reviewCount: 7, yearsInBusiness: 4,
    },
    {
      businessName: 'Bayou Communications Group',
      city: 'Houston', state: 'TX', zip: '77001',
      category: ['FIBER', 'COPPER', 'TELECOM'],
      services: ['Fusion Splicing', 'Copper Plant Repair', 'OSP Splicing', 'Emergency Response', 'OTDR Testing'],
      phone: '(713) 555-0134',
      certifications: ['BICSI RCDD', 'FOA CFOT', 'IBEW', 'OSHA 30'],
      description: 'Full-spectrum cable splicing — fiber, copper, and telecom — serving the Houston metro and Gulf Coast region.',
      emergencyService: true, rating: 4.9, reviewCount: 42, yearsInBusiness: 18,
    },
    {
      businessName: 'Keystone Splice & Test',
      city: 'Philadelphia', state: 'PA', zip: '19101',
      category: ['FIBER'],
      services: ['Single-Mode Fusion Splicing', 'Multi-Mode Splicing', 'OTDR Testing', 'Network Restoration'],
      phone: '(215) 555-0162',
      certifications: ['FOA CFOT', 'FOA CFOS', 'PA Licensed Contractor'],
      description: 'Philadelphia-area fiber optic splicing specialists for carrier, enterprise, and municipal clients.',
      emergencyService: true, rating: 4.6, reviewCount: 19, yearsInBusiness: 9,
    },
    {
      businessName: 'Desert Fiber & Telecom',
      city: 'Phoenix', state: 'AZ', zip: '85001',
      category: ['FIBER', 'TELECOM'],
      services: ['Fusion Splicing', 'OSP Splicing', 'FTTX', 'Conduit Repair', 'Emergency Service'],
      phone: '(602) 555-0109',
      certifications: ['FOA CFOT', 'BICSI Technician', 'OSHA 10'],
      description: 'Arizona-based fiber and telecom splicing with experience in desert conduit environments and high-temperature closure work.',
      emergencyService: true, rating: 4.4, reviewCount: 11, yearsInBusiness: 7,
    },
  ]

  for (const data of listings) {
    const base = slugify(`${data.businessName}-${data.city}-${data.state}`)
    let slug = base
    let i = 1
    while (await prisma.listing.findUnique({ where: { slug } })) {
      slug = `${base}-${i++}`
    }

    const listing = await prisma.listing.create({
      data: {
        slug,
        businessName: data.businessName,
        description: data.description,
        category: data.category as any,
        services: data.services,
        phone: data.phone,
        certifications: data.certifications,
        city: data.city,
        state: data.state,
        zip: data.zip,
        emergencyService: data.emergencyService,
        rating: data.rating,
        reviewCount: data.reviewCount,
        yearsInBusiness: data.yearsInBusiness,
        verified: true,
        published: true,
      },
    })

    await prisma.review.createMany({
      data: [
        {
          listingId: listing.id,
          name: 'J. Morrison',
          rating: 5,
          comment: `Great work from ${data.businessName}. Professional crew, on time, and clean splices verified by OTDR.`,
        },
        {
          listingId: listing.id,
          name: 'T. Reyes',
          rating: Math.round(data.rating),
          comment: 'Reliable contractor. Would hire again for our next fiber buildout phase.',
        },
      ],
    })

    console.log(`Created: ${data.businessName}`)
  }

  console.log('Seed complete.')
}

main().catch(console.error).finally(() => prisma.$disconnect())
