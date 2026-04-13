import client from '../client.js'

const index = 'products'

async function analytics() {
  const result = await client.search({
    index,
    size: 0,
    aggs: {
      top_categories: {
        terms: { field: 'category', size: 5 },
        aggs: {
          avg_price: { avg: { field: 'price' } },
          avg_stars: { avg: { field: 'stars' } },
          total_bought: { sum: { field: 'boughtInLastMonth' } }
        }
      },
      price_stats: {
        extended_stats: { field: 'price' }
      },
      best_sellers_count: {
        filter: { term: { isBestSeller: true } }
      }
    }
  })

  const aggs = result.aggregations as Record<string, any>

  console.log('Top 5 categories:\n')
  for (const bucket of aggs.top_categories.buckets) {
    console.log(
      `  ${bucket.key} (${bucket.doc_count} products)` +
        ` — avg $${bucket.avg_price.value?.toFixed(2)}` +
        ` — ${bucket.avg_stars.value?.toFixed(1)} stars` +
        ` — ${bucket.total_bought.value} bought last month`
    )
  }

  console.log('\nPrice statistics:')
  const stats = aggs.price_stats
  console.log(`  Min: $${stats.min?.toFixed(2)}`)
  console.log(`  Max: $${stats.max?.toFixed(2)}`)
  console.log(`  Avg: $${stats.avg?.toFixed(2)}`)
  console.log(`  Std dev: $${stats.std_deviation?.toFixed(2)}`)

  console.log(`\nBest sellers: ${aggs.best_sellers_count.doc_count}`)
}

await analytics()
