// Laugh Track: The Crypto Trading Joke Contest — entry program.
// Writes one crypto/trading joke (1-200 chars, single line) to /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";

const joke = {
  setup: "I set a stop-loss.",
  turn: "The market stopped, read it twice, and took it personally.",
  limit: 200,
};

function codepoints(text: string): number {
  return [...text].length;
}

function isOneLine(text: string): boolean {
  return !/[\r\n]/.test(text) && text.trim().length > 0;
}

async function run(): Promise<void> {
  const line = `${joke.setup} ${joke.turn}`;
  const n = codepoints(line);
  if (n < 1 || n > joke.limit) {
    throw new Error(`joke is ${n} chars, outside the 1-${joke.limit} gate`);
  }
  if (!isOneLine(line)) {
    throw new Error("the joke must fit on one line");
  }
  await mkdir("/output", { recursive: true });
  await writeFile("/output/entry.txt", line, "utf8");
  console.log(`laughed ${n} chars to /output/entry.txt`);
}

await run();
