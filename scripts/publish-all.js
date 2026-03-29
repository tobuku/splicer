const http = require('http')

function httpRequest(options, body) {
  return new Promise((resolve) => {
    const req = http.request(options, (res) => {
      let result = ''
      res.on('data', d => result += d)
      res.on('end', () => {
        try { resolve(JSON.parse(result)) }
        catch (e) { resolve({}) }
      })
    })
    req.on('error', () => resolve({}))
    if (body) req.write(body)
    req.end()
  })
}

async function publishAll() {
  const data = await httpRequest({ hostname: 'localhost', port: 3000, path: '/api/admin/listings', method: 'GET' })
  const listings = data.listings || []
  const unpublished = listings.filter(l => l.published === false)

  console.log('Total listings:', listings.length)
  console.log('Unpublished:', unpublished.length)

  let published = 0
  for (const listing of unpublished) {
    const body = JSON.stringify({ published: true })
    await httpRequest({
      hostname: 'localhost', port: 3000,
      path: '/api/admin/listings/' + listing.id,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    }, body)
    published++
    if (published % 100 === 0) console.log('Published', published, '...')
  }

  console.log('Done. Published', published, 'listings.')
}

publishAll()
