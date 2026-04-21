import { createRequire } from "node:module";

export function readJSON(filePath) {
  const require = createRequire(import.meta.url);
  return require(filePath);
}
