#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const workspace = path.resolve(process.argv[2] ?? ".");
const errors = [];
const stats = { pages: 0, links: 0, diagrams: 0, quizzes: 0 };

async function exists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function walkHtml(directory) {
  if (!(await exists(directory))) return [];
  const output = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...(await walkHtml(target)));
    else if (entry.isFile() && entry.name.endsWith(".html")) output.push(target);
  }
  return output;
}

function within(parent, target) {
  const relative = path.relative(parent, target);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative));
}

function localPath(value) {
  if (!value || value.startsWith("#") || /^(?:https?:|mailto:|tel:|data:)/i.test(value)) return null;
  return decodeURIComponent(value.split(/[?#]/, 1)[0]);
}

async function verifyPage(file) {
  const relative = path.relative(workspace, file).split(path.sep).join("/");
  const html = await fs.readFile(file, "utf8");
  stats.pages += 1;

  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  if (h1Count !== 1) errors.push(`${relative}: expected one H1, found ${h1Count}`);
  if (!html.includes('class="document-body"')) errors.push(`${relative}: missing document-body`);
  if (/file:\/\/|\/Users\//.test(html)) errors.push(`${relative}: contains a machine-local absolute path`);

  const ids = Array.from(html.matchAll(/\sid=["']([^"']+)["']/gi), (match) => match[1]);
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) errors.push(`${relative}: duplicate id ${id}`);
    seen.add(id);
  }

  stats.diagrams += (html.match(/<pre\s+class=["'][^"']*\bmermaid\b/gi) ?? []).length;
  stats.quizzes += (html.match(/\sdata-quiz(?:\s|>|=)/gi) ?? []).length;

  for (const match of html.matchAll(/\s(?:href|src)=["']([^"']+)["']/gi)) {
    const targetPath = localPath(match[1]);
    if (!targetPath) continue;
    stats.links += 1;
    const target = path.resolve(path.dirname(file), targetPath);
    if (!within(workspace, target)) {
      errors.push(`${relative}: local reference escapes workspace -> ${match[1]}`);
    } else if (!(await exists(target))) {
      errors.push(`${relative}: broken local reference -> ${match[1]}`);
    }
  }
}

const pages = [
  ...((await exists(path.join(workspace, "index.html"))) ? [path.join(workspace, "index.html")] : []),
  ...(await walkHtml(path.join(workspace, "lessons"))),
  ...(await walkHtml(path.join(workspace, "reference"))),
];

if (!pages.length) errors.push("No HTML pages found in index.html, lessons/, or reference/");

for (const required of [
  "assets/styles.css",
  "assets/lesson.css",
  "assets/course-components.css",
  "assets/app.js",
  "assets/quiz.js",
  "assets/mermaid.min.js",
  "assets/MERMAID-LICENSE",
  "assets/fonts/LICENSE",
]) {
  if (!(await exists(path.join(workspace, required)))) errors.push(`Missing bundled asset: ${required}`);
}

for (const page of pages) await verifyPage(page);

if (errors.length) {
  console.error(`Course verification failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `Verified ${stats.pages} HTML page(s), ${stats.links} local references, ` +
      `${stats.diagrams} Mermaid diagram(s), and ${stats.quizzes} quiz block(s).`
  );
}

