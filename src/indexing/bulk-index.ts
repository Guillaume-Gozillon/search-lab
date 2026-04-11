import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import client from "../client.js";

const INDEX = "products";
const CSV_PATH = "datasets/amazon_products.csv";
const BATCH_SIZE = 5_000;

async function bulkIndex() {
  const rl = createInterface({ input: createReadStream(CSV_PATH) });

  let batch: Record<string, unknown>[] = [];
  let total = 0;
  let isHeader = true;
  let headers: string[] = [];

  for await (const line of rl) {
    if (isHeader) {
      headers = line.split(",");
      isHeader = false;
      continue;
    }

    const values = line.split(",");
    const doc: Record<string, unknown> = {};
    headers.forEach((h, i) => {
      doc[h.trim()] = values[i]?.trim();
    });

    batch.push(doc);

    if (batch.length >= BATCH_SIZE) {
      await flush(batch);
      total += batch.length;
      console.log(`Indexed ${total} documents...`);
      batch = [];
    }
  }

  if (batch.length > 0) {
    await flush(batch);
    total += batch.length;
  }

  await client.indices.refresh({ index: INDEX });
  console.log(`Done — ${total} documents indexed into "${INDEX}".`);
}

async function flush(docs: Record<string, unknown>[]) {
  const operations = docs.flatMap((doc) => [
    { index: { _index: INDEX } },
    doc,
  ]);

  const { errors, items } = await client.bulk({ refresh: false, operations });

  if (errors) {
    const failed = items.filter((item) => item.index?.error);
    console.error(`${failed.length} documents failed to index.`);
  }
}

await bulkIndex();
