import client from '../client.js'

const INDEX = 'products'

// TODO: Adjust field types and analyzers based on query requirements
async function createMapping() {
  const exists = await client.indices.exists({ index: INDEX })

  if (exists) {
    console.log(`Index "${INDEX}" already exists — deleting first.`)
    await client.indices.delete({ index: INDEX })
  }

  await client.indices.create({
    index: INDEX,
    body: {
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
    }
  })

  console.log(`Index "${INDEX}" created with mapping.`)
}

await createMapping()
