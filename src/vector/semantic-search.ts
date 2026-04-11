import client from '../client.js'

const INDEX = 'products-vector'

// TODO: Choose an embedding model and integrate it (e.g. Elasticsearch inference API, OpenAI, etc.)
// TODO: Create an ingest pipeline with an inference processor for automatic embedding

async function createVectorIndex() {
  const exists = await client.indices.exists({ index: INDEX })
  if (exists) {
    console.log(`Index "${INDEX}" already exists — skipping creation.`)
    return
  }

  await client.indices.create({
    index: INDEX,
    body: {
      mappings: {
        properties: {
          title: { type: 'text' },
          description: { type: 'text' },
          category: { type: 'keyword' },
          // TODO: Set dims to match the chosen embedding model
          title_vector: {
            type: 'dense_vector',
            dims: 384,
            index: true,
            similarity: 'cosine'
          }
        }
      }
    }
  })

  console.log(`Vector index "${INDEX}" created.`)
}

// TODO: Replace with real embeddings from a model
function mockEmbedding(_text: string): number[] {
  return Array.from({ length: 384 }, () => Math.random() * 2 - 1)
}

async function semanticSearch(query: string) {
  const queryVector = mockEmbedding(query)

  const result = await client.search({
    index: INDEX,
    body: {
      knn: {
        field: 'title_vector',
        query_vector: queryVector,
        k: 10,
        num_candidates: 50
      },
      _source: ['title', 'category']
    }
  })

  console.log(`Semantic search results for "${query}":\n`)
  for (const hit of result.hits.hits) {
    const src = hit._source as Record<string, unknown>
    console.log(`  [${hit._score?.toFixed(4)}] ${src.title} (${src.category})`)
  }
}

await createVectorIndex()
const term = process.argv[2] ?? 'comfortable noise cancelling headphones'
await semanticSearch(term)
