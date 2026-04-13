import client from '../client.js'

const index = 'products'

// TODO: Combine bool queries with must / filter / should / must_not
async function filteredSearch() {
  const result = await client.search({
    index,
    query: {
      bool: {
        must: [{ match: { title: 'laptop' } }],
        filter: [
          { range: { price: { gte: 500, lte: 1500 } } },
          { term: { isBestSeller: true } },
          { range: { stars: { gte: 4.0 } } }
        ]
      }
    },
    size: 10
  })

  console.log(`Filtered results (${result.hits.total}):\n`)
  for (const hit of result.hits.hits) {
    const src = hit._source as Record<string, unknown>
    console.log(`  ${src.title} — $${src.price} (${src.stars} stars)`)
  }
}

await filteredSearch()
