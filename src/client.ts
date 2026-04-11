import 'dotenv/config'
import { Client } from '@elastic/elasticsearch'

const client = new Client({
  node: process.env.ELASTICSEARCH_URL ?? 'http://localhost:9200',
  ...(process.env.ELASTICSEARCH_API_KEY && {
    auth: { apiKey: process.env.ELASTICSEARCH_API_KEY }
  })
})

export default client

const info = await client.info()
console.log(
  `Connected to Elasticsearch ${info.version.number} (cluster: ${info.cluster_name})`
)
