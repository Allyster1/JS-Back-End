import fs from "fs";

const readStream = fs.createReadStream("./input.txt", {
  encoding: "utf-8",
  highWaterMark: 1000,
});

readStream.on("data", (chunk) => {
  console.log("----- New Chunk -----");
  console.log(chunk);
});

readStream.on("end", () => {
  console.log("stream ended");
});
