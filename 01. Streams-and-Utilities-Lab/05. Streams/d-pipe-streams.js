import fs from "fs";

const readStream = fs.createReadStream("./input.txt", {
  encoding: "utf-8",
  highWaterMark: 1000,
});

const writeStream = fs.createWriteStream("./write.txt", { encoding: "utf-8" });

readStream.pipe(writeStream);
