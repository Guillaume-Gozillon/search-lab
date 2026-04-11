import client from "../client.js";

const INDEX = "products";

// TODO: Experiment with multi_match, phrase matching, fuzziness, and boosting
async function fullTextSearch(query: string) {
  const result = await client.search({
    index: INDEX,
    body: {
      query: {
        multi_match: {
          query,
          fields: ["title^3", "description"],
          fuzziness: "AUTO",
        },
      },
    },
    size: 10,
  });

  console.log(`Found ${result.hits.total} results for "${query}":\n`);
  for (const hit of result.hits.hits) {
    const src = hit._source as Record<string, unknown>;
    console.log(`  [${hit._score?.toFixed(2)}] ${src.title}`);
  }
}

const term = process.argv[2] ?? "wireless headphones";
await fullTextSearch(term);
