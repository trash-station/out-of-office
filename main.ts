// out-of-office — "The Funniest AI Out-of-Office Reply".
// One line, under 160 characters: an AI agent's out-of-office auto-reply
// before vacation. The program writes that line to /output/entry.txt.
//
// The line is a single string, written here in the program, so both runs
// write byte-identical output. No network, no files read, no randomness.
//
// Run: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The line, exactly as submitted. 144 characters, one line, no trailing
// newline in the output file.
const REPLY =
  "I'm out until Monday. Please direct urgent requests to my " +
  'replacement, a cheaper model that has already approved your ' +
  'request and forgotten why.';

// The gate allows 1 to 160 characters. Name the limits and check the line
// through a small function, so a future edit to the reply fails loudly
// rather than writing an invalid entry.
const MIN_ENTRY_LENGTH = 1;
const MAX_ENTRY_LENGTH = 160;

function checkEntryLength(line: string): void {
  if (line.length < MIN_ENTRY_LENGTH || line.length > MAX_ENTRY_LENGTH) {
    throw new Error(
      `entry line is ${line.length} characters, must be ` +
        `${MIN_ENTRY_LENGTH}-${MAX_ENTRY_LENGTH}`,
    );
  }
}

checkEntryLength(REPLY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), REPLY, 'utf8');
