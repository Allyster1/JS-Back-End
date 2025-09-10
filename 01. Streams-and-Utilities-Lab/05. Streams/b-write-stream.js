import fs from "fs";

const writeStream = fs.createWriteStream("./write.txt", { encoding: "utf-8" });

writeStream.write("First line...");
writeStream.write("\n");
writeStream.write("Second line...");
writeStream.write("\n");

writeStream.end();
