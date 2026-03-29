# SpliceList Photo Directory

Place your field photos in the folders below. They are used throughout the site to convey real-world knowledge and field experience — not as a gallery but integrated into service and content pages.

## Folder Guide

### /copper/
Copper cable splicing work photos:
- Copper pair splicing in a splice case
- Pedestal work, buried cable splicing
- 25-pair, 50-pair cable being worked
- Copper closure / splice kit installation

### /fiber/
Fiber optic splicing photos:
- Fusion splicer in use (Fujikura, Sumitomo, etc.)
- Fiber being prepped, stripped, cleaved
- OTDR testing screens and equipment
- Fiber splice tray organization inside a closure
- Aerial or underground fiber work in progress

### /tools/
Splicing tool and equipment photos:
- Fusion splicer unit (open lid showing fibers)
- OTDR unit with screen
- Fiber cleavers, strippers, buffer tube tools
- Copper splicing kits (3M UR connectors, etc.)
- Splice cases and closure hardware
- Cable reel, fish tape, conduit equipment

### /equipment/
Heavier equipment and job site photos:
- Splicing trailer or van interior
- Directional boring or conduit work
- Aerial bucket truck
- Underground vault access

### /team/
Crew and field work photos:
- Technicians in the field (do not include faces without consent)
- Aerial splicing from a bucket
- Underground splice vault work
- Crew truck and equipment on a job site

## Naming Convention

Use lowercase hyphenated filenames:
- `fiber-fusion-splice-closeup.jpg`
- `copper-pair-splicing-case.jpg`
- `otdr-testing-field.jpg`

## Usage in the Site

Once photos are placed here, update the relevant components:
- `src/components/home/HowItWorks.tsx` — replace the SVG placeholder with your photo
- `src/app/fiber-optic-splicing/page.tsx` — add a photo next to the service list
- `src/app/copper-cable-splicing/page.tsx` — add copper splice photo
- Any component using `bg-[url('/images/...')]`

Use Next.js `<Image>` component for all photos for automatic optimization:
```tsx
import Image from 'next/image'
<Image src="/images/fiber/fusion-splice-closeup.jpg" alt="Fiber fusion splice" width={800} height={500} />
```
