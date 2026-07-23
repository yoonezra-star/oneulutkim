import { readFileSync, writeFileSync } from "node:fs";
import ts from "typescript";

const dataPath = "app/data.ts";
const schedulePath = "app/publish-schedule.ts";
const outputPath = "app/published-scheduled-posts.ts";

function readPublishCutoff() {
  const source = readFileSync(schedulePath, "utf8");
  const match = source.match(/publishCutoffDate\s*=\s*"([^"]+)"/);

  if (!match) {
    throw new Error(`Could not find publishCutoffDate in ${schedulePath}`);
  }

  return new Date(match[1]);
}

function parsePostDate(date) {
  const match = date.match(/^(\d{2})\/(\d{2})\/(\d{2})\s+(\d{2}):(\d{2})/);

  if (!match) {
    return new Date(0);
  }

  const [, year, month, day, hour, minute] = match;
  return new Date(`20${year}-${month}-${day}T${hour}:${minute}:00+09:00`);
}

function literalValue(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }

  if (ts.isNumericLiteral(node)) {
    return Number(node.text);
  }

  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map(literalValue);
  }

  if (ts.isObjectLiteralExpression(node)) {
    return objectValue(node);
  }

  throw new Error(`Unsupported scheduled post value: ${node.getText()}`);
}

function objectValue(node) {
  const result = {};

  for (const property of node.properties) {
    if (!ts.isPropertyAssignment(property)) {
      continue;
    }

    const key = ts.isIdentifier(property.name)
      ? property.name.text
      : ts.isStringLiteral(property.name)
        ? property.name.text
        : undefined;

    if (!key) {
      throw new Error(`Unsupported scheduled post key: ${property.name.getText()}`);
    }

    result[key] = literalValue(property.initializer);
  }

  return result;
}

function findScheduledPosts() {
  const source = readFileSync(dataPath, "utf8");
  const file = ts.createSourceFile(dataPath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let initializer;

  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name?.text === "scheduledPosts") {
      initializer = node.initializer;
    }

    ts.forEachChild(node, visit);
  }

  visit(file);

  if (!initializer || !ts.isArrayLiteralExpression(initializer)) {
    throw new Error(`Could not find scheduledPosts array in ${dataPath}`);
  }

  return initializer.elements.map(literalValue);
}

const cutoff = readPublishCutoff();
const published = findScheduledPosts()
  .filter((post) => parsePostDate(post.date).getTime() <= cutoff.getTime())
  .sort((a, b) => b.id - a.id);

const body = JSON.stringify(published, null, 2);
writeFileSync(
  outputPath,
  `import type { Post } from "./data";\n\nexport const publishedScheduledPosts: Post[] = ${body};\n`,
);

console.log(`Published scheduled posts: ${published.length}`);
