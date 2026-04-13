import client from '../client.js'

const index = 'products'

// TODO: Adjust field types and analyzers based on query requirements
async function createMapping() {
  const exists = await client.indices.exists({ index: index })

  if (exists) {
    console.log(`Index "${index}" already exists — deleting first.`)
    await client.indices.delete({ index: index })
  }

  await client.indices.create({
    index,
    settings: {
      number_of_shards: 1,
      number_of_replicas: 0
    },
    mappings: {
      properties: {
        // TODO: Define the full mapping for amazon_products fields
        title: { type: 'text', analyzer: 'standard' },
        description: { type: 'text', analyzer: 'standard' },
        category: { type: 'keyword' },
        price: { type: 'float' },
        stars: { type: 'float' },
        reviews: { type: 'integer' },
        isBestSeller: { type: 'boolean' },
        boughtInLastMonth: { type: 'integer' }
      }
    }
  })

  console.log(`Index "${index}" created with mapping.`)
}

await createMapping()
