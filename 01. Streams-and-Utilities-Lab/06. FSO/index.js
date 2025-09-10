import fs from "fs";
import fsPromises from "fs/promises";

// Syncronous useCase
const loremText = fs.readFileSync("./input.txt", { encoding: "utf-8" });

// Async with callbacks
fs.readFile("./input.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) {
    return console.log(err.message);
  }

  console.log(data);
});

// Async with promises
const promiseResult = await fsPromises.readFile("./input.txt", {
  encoding: "utf-8",
});

// Read directory
const dirList = await fsPromises.readdir(".");
console.log(dirList);

// Remove directory if exists
if (dirList.includes("created-dir")) {
  await fsPromises.rmdir("./created-dir");
}

// Create directory
await fsPromises.mkdir("created-dir");

// Rename file or directory
// await fsPromises.rename("input.txt", 'input2.txt')

await fsPromises.writeFile("./output.txt", "Kakvoto si iskam", {
  encoding: "utf-8",
});

// Delete file
await fsPromises.unlink("./output.txt");
