import client from '../client.js'

const INDEX = 'products'

// TODO: Compare from/size vs search_after for deep pagination
async function paginateWithFromSize(page: number, pageSize: number) {
  const from = (page - 1) * pageSize

  const result = await client.search({
    index: INDEX,
    body: {
      query: { match_all: {} },
      sort: [{ price: 'desc' }, { _score: 'desc' }]
    },
    from,
    size: pageSize
  })

  console.log(`Page ${page} (from/size) — ${result.hits.hits.length} hits:\n`)
  for (const hit of result.hits.hits) {
    const src = hit._source as Record<string, unknown>
    console.log(`  ${src.title} — $${src.price}`)
  }

  return result.hits.hits.at(-1)?.sort
}

// TODO: Implement search_after pagination using the sort values from the last hit
async function paginateWithSearchAfter(
  searchAfter: unknown[],
  pageSize: number
) {
  const result = await client.search({
    index: INDEX,
    body: {
      query: { match_all: {} },
      sort: [{ price: 'desc' }, { _score: 'desc' }],
      search_after: searchAfter
    },
    size: pageSize
  })

  console.log(`Next page (search_after) — ${result.hits.hits.length} hits:\n`)
  for (const hit of result.hits.hits) {
    const src = hit._source as Record<string, unknown>
    console.log(`  ${src.title} — $${src.price}`)
  }
}

const lastSort = await paginateWithFromSize(1, 5)
if (lastSort) {
  await paginateWithSearchAfter(lastSort, 5)
}
