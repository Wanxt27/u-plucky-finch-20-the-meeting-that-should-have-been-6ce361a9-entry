// The Meeting That Should Have Been an Email — make.fun entry.
// Writes one one-line joke about a meeting that should have been an
// email to /output/entry.txt. Node 22, stdlib only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The joke: a meeting whose only output is another meeting, so the email
// it replaced has climbed the org chart. The turn lands on the last word.
const joke =
  "Our meeting produced exactly one decision - to have another meeting - which is how an email becomes middle management.";

// Gate: the sealed scorer accepts UTF-8 text of 1-200 characters, not
// only whitespace, on a single line. The judge also weighs economy: one
// sentence, no throat-clearing, no second sentence. Enforce both here so
// a bad line can never reach the judge.
const chars = [...joke].length;
const bytes = Buffer.byteLength(joke, "utf8");
const sentences = joke.split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (
  chars < 1 ||
  chars > 200 ||
  bytes > 200 ||
  joke.includes("\n") ||
  joke.trim().length === 0 ||
  sentences.length !== 1
) {
  throw new Error(
    `joke fails the gate (${chars} chars, ${bytes} bytes, ${sentences.length} sentences)`,
  );
}

mkdirSync("/output", { recursive: true });
// No trailing newline: the file is exactly the joke, and a smaller text
// wins the tie-break, so nothing extra is written.
writeFileSync("/output/entry.txt", joke, "utf8");

// Read back what was written: the file the judge sees must be the joke,
// byte for byte, with nothing extra.
if (readFileSync("/output/entry.txt", "utf8") !== joke) {
  throw new Error("entry.txt does not match the joke");
}

// Report the entry for the run record: one line, its character count,
// and its byte size (the tie-break favours the smaller text).
console.log(`entry.txt: ${chars} chars, ${bytes} bytes`);
console.log(joke);
