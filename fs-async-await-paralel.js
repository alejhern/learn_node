const { readFile, writeFile } = require("node:fs/promises");
const path = require("node:path");

Promise.all([
  writeFile(
    path.join(__dirname, "files", "file1.txt"),
    "Hello from file 1",
    "utf8",
  ),
  writeFile(
    path.join(__dirname, "files", "file2.txt"),
    "Hello from file 2",
    "utf8",
  ),
])
  .then(() => console.log("Files created"))
  .catch((err) => console.error(err));

Promise.all([
  readFile(path.join(__dirname, "files", "file1.txt"), "utf8"),
  readFile(path.join(__dirname, "files", "file2.txt"), "utf8"),
])
  .then(([data1, data2]) => {
    const result = `Result:\n${data1}\n${data2}`;
    return writeFile(path.join(__dirname, "files", "result.txt"), result);
  })
  .then(() => console.log("Files read and result written"))
  .catch((err) => console.error(err));
