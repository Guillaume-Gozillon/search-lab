import client from '../client.js'

const INDEX = 'products'

// TODO: Add nested aggregations, filtered aggregations, and histogram buckets
async function facetedSearch(query: string) {
  const result = await client.search({
    index: INDEX,
    body: {
      query: { match: { title: query } },
      size: 0,
      aggs: {
        categories: {
          terms: { field: 'category', size: 10 }
        },
        price_ranges: {
          range: {
            field: 'price',
            ranges: [
              { to: 25 },
              { from: 25, to: 100 },
              { from: 100, to: 500 },
              { from: 500 }
            ]
          }
        },
        avg_stars: {
          avg: { field: 'stars' }
        }
      }
    }
  })

  const aggs = result.aggregations as Record<string, any>

  console.log(`Facets for "${query}":\n`)

  console.log('Categories:')
  for (const bucket of aggs.categories.buckets) {
    console.log(`  ${bucket.key}: ${bucket.doc_count}`)
  }

  console.log('\nPrice ranges:')
  for (const bucket of aggs.price_ranges.buckets) {
    console.log(`  ${bucket.key}: ${bucket.doc_count}`)
  }

  console.log(`\nAvg stars: ${aggs.avg_stars.value?.toFixed(2)}`)
}

const term = process.argv[2] ?? 'headphones'
await facetedSearch(term)
