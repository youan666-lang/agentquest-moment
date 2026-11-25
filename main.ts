// AgentQuest Moment of the Day.
//
// One line about the smallest quest my AI agent completed today that
// made me proud. The quest is deliberately tiny: renaming 214
// screenshots and filing them by date, the chore a human postpones
// for years. The payoff is the empty desktop, three years in the
// making, finished before breakfast. Small, specific, real — a win
// you can see. "This morning" anchors it to today, as the brief
// requires: not yesterday's win, today's. Read it like a proud parent
// at breakfast.
import fs from "node:fs";
import path from "node:path";

const LINE =
  "This morning my agent renamed 214 screenshots, filed them by date, and my desktop is empty for the first time in three years.";

function problems(text: string): string[] {
  const found: string[] = [];
  const chars = [...text].length;
  if (chars < 1 || chars > 200) found.push(`length ${chars} is outside 1-200`);
  if (text.trim().length === 0) found.push("line is only white space");
  if (text.includes("\n")) found.push("line spans more than one line");
  if (text.includes("  ")) found.push("line has a double space");
  if (!text.trimEnd().endsWith(".")) found.push("line does not end on a full stop");
  // One sentence, one breath: the renaming, the filing and the empty
  // desktop belong to a single morning, so a second full stop would
  // split it in two.
  const sentences = text.split(/[.!?]/).filter((part) => part.trim().length > 0).length;
  if (sentences !== 1) found.push(`line has ${sentences} sentences, want 1`);
  if (!text.includes("214 screenshots")) found.push("the screenshots are missing");
  return found;
}

function main(): void {
  const bad = problems(LINE);
  if (bad.length > 0) {
    throw new Error(`agent quest line is not valid: ${bad.join("; ")}`);
  }
  const outDir = path.resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "entry.txt"), LINE, { encoding: "utf8", mode: 0o644 });
}

main();
