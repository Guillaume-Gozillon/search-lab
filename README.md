# search-lab

Elasticsearch experiments with TypeScript — from full-text search to vector queries.

## Quick start

```bash
# Start Elasticsearch & Kibana
docker compose up -d

# Install dependencies
npm install

# Copy env and adjust if needed
cp .env.example .env

# Verify connection
npx tsx src/client.ts
```

## Dataset

This project uses the [Amazon Products Dataset 2023](https://www.kaggle.com/datasets/asaniczka/amazon-products-dataset-2023-1-4m-products) (~1.4M products).
See [`datasets/README.md`](datasets/README.md) for download instructions.

## Scripts

| Command                    | Description           |
| -------------------------- | --------------------- |
| `npm run index:mapping`    | Create index mapping  |
| `npm run index:bulk`       | Bulk-index the CSV    |
| `npm run query:fulltext`   | Full-text search      |
| `npm run query:filters`    | Bool / filter queries |
| `npm run query:pagination` | Pagination strategies |
| `npm run agg:facets`       | Faceted search        |
| `npm run agg:analytics`    | Aggregation analytics |
| `npm run vector:search`    | Semantic / kNN search |

## Articles

| #   | Title | Link |
| --- | ----- | ---- |
|     |       |      |

## Stack

- **Elasticsearch** 8.17 (single-node, Docker)
- **Kibana** 8.17
- **TypeScript** (strict, ESNext)
- **@elastic/elasticsearch** — official Node.js client
- **tsx** — run `.ts` files directly
