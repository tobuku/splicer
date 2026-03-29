const AFFILIATE_TAG = 'dwelldoc-20'

function amazonLink(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`
}

function amazonSearch(query: string): string {
  return `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${AFFILIATE_TAG}`
}

export interface Tool {
  id: string
  name: string
  brand: string
  description: string
  category: string
  priceRange: string
  affiliate: string
  featured?: boolean
  badge?: string
}

export const TOOL_CATEGORIES = [
  { id: 'fusion-splicers', label: 'Fusion Splicers', icon: 'splicer' },
  { id: 'cleavers', label: 'Fiber Cleavers', icon: 'cleaver' },
  { id: 'otdr', label: 'OTDR & Test Equipment', icon: 'otdr' },
  { id: 'fiber-prep', label: 'Fiber Prep Tools', icon: 'prep' },
  { id: 'copper-splicing', label: 'Copper Splicing', icon: 'copper' },
  { id: 'closures', label: 'Splice Closures & Kits', icon: 'closure' },
  { id: 'safety', label: 'Safety Equipment', icon: 'safety' },
]

export const TOOLS: Tool[] = [
  // ── Fusion Splicers ──────────────────────────────────────────────────────
  {
    id: 'fujikura-fsm-90s',
    name: 'FSM-90S Fusion Splicer',
    brand: 'Fujikura',
    description: 'Industry-leading core alignment fusion splicer. 7-second splice time, 30-second heat shrink. Standard in OSP and ISP deployments worldwide.',
    category: 'fusion-splicers',
    priceRange: '$$$',
    affiliate: amazonSearch('Fujikura FSM-90S fusion splicer'),
    featured: true,
    badge: 'Industry Standard',
  },
  {
    id: 'sumitomo-z1c',
    name: 'Type-Z1C Fusion Splicer',
    brand: 'Sumitomo',
    description: 'Compact, lightweight core alignment splicer with built-in cleaver. Ideal for FTTX and aerial splicing where portability matters.',
    category: 'fusion-splicers',
    priceRange: '$$$',
    affiliate: amazonSearch('Sumitomo Type-Z1C fusion splicer'),
    featured: true,
  },
  {
    id: 'inno-view7',
    name: 'VIEW 7 Fusion Splicer',
    brand: 'INNO',
    description: 'High-performance splicer at a mid-range price point. 5.1 inch touchscreen, 6-second splice, full core alignment. Good entry point for new crews.',
    category: 'fusion-splicers',
    priceRange: '$$',
    affiliate: amazonSearch('INNO VIEW 7 fusion splicer'),
    badge: 'Best Value',
  },
  {
    id: 'fiber-splicer-dvp-740',
    name: 'DVP-740 Fusion Splicer',
    brand: 'DVP',
    description: 'Budget-friendly core alignment splicer with fast splice times and solid splice loss performance. Popular for high-volume FTTX builds.',
    category: 'fusion-splicers',
    priceRange: '$',
    affiliate: amazonSearch('DVP-740 fusion splicer'),
  },

  // ── Fiber Cleavers ───────────────────────────────────────────────────────
  {
    id: 'fujikura-ct-30a',
    name: 'CT-30A Fiber Cleaver',
    brand: 'Fujikura',
    description: 'High-precision fiber cleaver compatible with all major splicers. 48,000-blade rotation, consistent cleave angles under 0.5 degrees.',
    category: 'cleavers',
    priceRange: '$$',
    affiliate: amazonSearch('Fujikura CT-30A fiber cleaver'),
    featured: true,
    badge: 'Top Rated',
  },
  {
    id: 'sumitomo-fc-6s',
    name: 'FC-6S Fiber Cleaver',
    brand: 'Sumitomo',
    description: 'Precision cleaver with automatic blade advance. Works with both 250µm and 900µm coated fibers. Blade life up to 48,000 cleaves.',
    category: 'cleavers',
    priceRange: '$$',
    affiliate: amazonSearch('Sumitomo FC-6S fiber cleaver'),
  },
  {
    id: 'miller-cfs-2',
    name: 'CFS-2 Fiber Cleaver',
    brand: 'Miller',
    description: 'Compact and affordable precision cleaver. Good for mechanical splicing and field repairs. Consistent results at a lower cost.',
    category: 'cleavers',
    priceRange: '$',
    affiliate: amazonSearch('Miller CFS-2 fiber cleaver'),
  },

  // ── OTDR & Test Equipment ────────────────────────────────────────────────
  {
    id: 'exfo-maxtester-730c',
    name: 'MaxTester 730C OTDR',
    brand: 'EXFO',
    description: 'Field-proven OTDR for single-mode and multimode testing. Fast test results, intuitive UI, and long dynamic range for OSP plant verification.',
    category: 'otdr',
    priceRange: '$$$',
    affiliate: amazonSearch('EXFO MaxTester 730C OTDR'),
    featured: true,
    badge: 'Pro Choice',
  },
  {
    id: 'fluke-optifiber-pro',
    name: 'OptiFiber Pro OTDR',
    brand: 'Fluke Networks',
    description: 'Enterprise-grade OTDR with automated testing and reporting. Ideal for certifying fiber plant on structured cabling and OSP projects.',
    category: 'otdr',
    priceRange: '$$$',
    affiliate: amazonSearch('Fluke OptiFiber Pro OTDR'),
  },
  {
    id: 'viavi-smartotdr',
    name: 'SmartOTDR',
    brand: 'VIAVI',
    description: 'Compact, affordable OTDR for field technicians. Connects to Android devices for reporting. Good for smaller contractors and training.',
    category: 'otdr',
    priceRange: '$$',
    affiliate: amazonSearch('VIAVI SmartOTDR'),
    badge: 'Compact',
  },
  {
    id: 'optical-power-meter',
    name: 'OPM-5 Optical Power Meter',
    brand: 'AFL',
    description: 'Handheld optical power meter for insertion loss testing. Essential for verifying splice quality and certifying fiber runs.',
    category: 'otdr',
    priceRange: '$',
    affiliate: amazonSearch('AFL optical power meter fiber'),
  },

  // ── Fiber Prep Tools ─────────────────────────────────────────────────────
  {
    id: 'miller-mas400',
    name: 'MAS-400 Mid-Span Access Tool',
    brand: 'Miller',
    description: 'Mid-span stripping tool for ribbon and tight-buffered cables. Consistent ring cuts without nicking fibers.',
    category: 'fiber-prep',
    priceRange: '$',
    affiliate: amazonSearch('Miller MAS-400 mid-span access tool'),
  },
  {
    id: 'clauss-stripper',
    name: 'No-Nik Fiber Optic Stripper',
    brand: 'Clauss',
    description: 'Precision 250µm and 900µm fiber coating stripper. Low blade pressure prevents microcracks. Standard in most splice kits.',
    category: 'fiber-prep',
    priceRange: '$',
    affiliate: amazonSearch('Clauss No-Nik fiber optic stripper'),
    badge: 'Essential',
  },
  {
    id: 'fiber-cleaning-kit',
    name: 'Fiber Optic Cleaning Kit',
    brand: 'Chemtronics',
    description: 'Complete fiber end-face cleaning kit including IPA wipes, stick cleaners, and lint-free pads. Clean fibers before every splice.',
    category: 'fiber-prep',
    priceRange: '$',
    affiliate: amazonSearch('fiber optic cleaning kit splice'),
  },
  {
    id: 'fiber-inspection-scope',
    name: '400x Fiber Inspection Scope',
    brand: 'AFL',
    description: 'Handheld 400x fiber end-face inspection microscope. Verify cleave quality and connector cleanliness in the field.',
    category: 'fiber-prep',
    priceRange: '$',
    affiliate: amazonSearch('fiber optic inspection scope 400x'),
  },

  // ── Copper Splicing ──────────────────────────────────────────────────────
  {
    id: '3m-ur-connectors',
    name: 'UR2 Connector Kit',
    brand: '3M',
    description: 'Industry-standard underground rated (UR) splice connectors for telephone and DSL pairs. Gel-filled for moisture resistance.',
    category: 'copper-splicing',
    priceRange: '$',
    affiliate: amazonSearch('3M UR2 splice connectors telephone'),
    featured: true,
    badge: 'Industry Standard',
  },
  {
    id: '3m-sco-splice',
    name: 'Scotchlok UDN Connector',
    brand: '3M',
    description: 'Single wire displacement connector for 22-26 AWG solid copper. Used for quick pair connections in pedestals and splice cases.',
    category: 'copper-splicing',
    priceRange: '$',
    affiliate: amazonSearch('3M Scotchlok UDN connector'),
  },
  {
    id: 'tempo-wire-mapper',
    name: '77HP Tone & Probe Kit',
    brand: 'Tempo',
    description: 'Essential tone and probe kit for tracing and identifying copper pairs. Standard equipment for telephone line splicing.',
    category: 'copper-splicing',
    priceRange: '$',
    affiliate: amazonSearch('Tempo 77HP tone probe kit'),
    badge: 'Essential',
  },
  {
    id: 'klein-wire-stripper',
    name: '11055 Wire Stripper/Cutter',
    brand: 'Klein Tools',
    description: 'Heavy-duty wire stripper and cutter for 10-18 AWG solid and stranded wire. Built for daily field use.',
    category: 'copper-splicing',
    priceRange: '$',
    affiliate: amazonSearch('Klein Tools 11055 wire stripper'),
  },
  {
    id: 'splice-moisture-seal',
    name: 'Moisture Seal Tape',
    brand: 'Scotch',
    description: '2242 Linerless rubber splicing tape for waterproofing copper splice closures and outdoor connections.',
    category: 'copper-splicing',
    priceRange: '$',
    affiliate: amazonSearch('Scotch 2242 rubber splicing tape'),
  },

  // ── Splice Closures & Kits ───────────────────────────────────────────────
  {
    id: 'tyco-ucns',
    name: 'UCNS Splice Closure',
    brand: 'CommScope',
    description: 'Universal closure for aerial, buried, and direct-buried fiber applications. Accepts multiple tray configurations up to 144 splices.',
    category: 'closures',
    priceRange: '$$',
    affiliate: amazonSearch('CommScope UCNS fiber splice closure'),
    featured: true,
  },
  {
    id: 'corning-ch-series',
    name: 'CH Series Splice Closure',
    brand: 'Corning',
    description: 'Dome-style fiber splice closure for underground and aerial use. Reenterable design with proven gel seal system.',
    category: 'closures',
    priceRange: '$$',
    affiliate: amazonSearch('Corning CH series fiber splice closure'),
  },
  {
    id: 'fiber-splice-tray',
    name: '12-Fiber Splice Tray',
    brand: 'Generic',
    description: 'Standard 12-fiber splice protection tray compatible with most dome and inline closures. Holds up to 12 heat shrink sleeves.',
    category: 'closures',
    priceRange: '$',
    affiliate: amazonSearch('12 fiber splice tray'),
  },
  {
    id: 'heat-shrink-sleeves',
    name: 'Fiber Splice Protection Sleeves',
    brand: 'Sumitomo',
    description: 'Standard 60mm fiber splice protection sleeves. Compatible with all fusion splicers. Box of 100.',
    category: 'closures',
    priceRange: '$',
    affiliate: amazonSearch('fiber splice protection sleeves 60mm'),
    badge: 'Essential',
  },

  // ── Safety Equipment ─────────────────────────────────────────────────────
  {
    id: 'safety-glasses',
    name: 'Anti-Fog Safety Glasses',
    brand: 'DeWalt',
    description: 'ANSI Z87.1 rated clear lens safety glasses. Fiber optic work requires eye protection — fiber shards are invisible and sharp.',
    category: 'safety',
    priceRange: '$',
    affiliate: amazonSearch('DeWalt safety glasses anti fog ANSI Z87'),
    badge: 'Required',
  },
  {
    id: 'fiber-disposal',
    name: 'Fiber Scrap Disposal Container',
    brand: 'Generic',
    description: 'Puncture-resistant container for disposing of fiber clippings. Fiber shards are a serious eye and skin hazard — never leave them loose.',
    category: 'safety',
    priceRange: '$',
    affiliate: amazonSearch('fiber optic scrap disposal container'),
    badge: 'Required',
  },
  {
    id: 'headlamp',
    name: 'Pro Headlamp 1000 Lumen',
    brand: 'Black Diamond',
    description: '1000-lumen rechargeable headlamp for vault, conduit, and low-light splice work. Hands-free lighting essential for field splicing.',
    category: 'safety',
    priceRange: '$',
    affiliate: amazonSearch('Black Diamond headlamp 1000 lumen rechargeable'),
  },
  {
    id: 'knee-pads',
    name: 'Professional Knee Pads',
    brand: 'ToughBuilt',
    description: 'Heavy-duty foam knee pads for vault and ground-level splice work. Reduces fatigue on long splicing sessions.',
    category: 'safety',
    priceRange: '$',
    affiliate: amazonSearch('ToughBuilt professional knee pads'),
  },
]

export function getToolsByCategory(categoryId: string): Tool[] {
  return TOOLS.filter((t) => t.category === categoryId)
}

export function getFeaturedTools(): Tool[] {
  return TOOLS.filter((t) => t.featured)
}

export function getToolsForCategory(splicingCategory: 'FIBER' | 'TELECOM' | 'COPPER'): Tool[] {
  const map: Record<string, string[]> = {
    FIBER:   ['fusion-splicers', 'cleavers', 'otdr', 'fiber-prep', 'closures'],
    TELECOM: ['fusion-splicers', 'otdr', 'closures', 'safety'],
    COPPER:  ['copper-splicing', 'safety'],
  }
  const cats = map[splicingCategory] || []
  return TOOLS.filter((t) => cats.includes(t.category) && t.featured)
}
