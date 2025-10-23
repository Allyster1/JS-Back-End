import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import routes from "./routes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();

await mongoose.connect("mongodb://localhost:27017", {
   dbName: "posts-sept-2025",
});

app.use(express.json());

// Manual config cors
// app.use((req, res, next) => {
//    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5500");
//    next();
// });

app.use(cors());

app.use(authMiddleware);

app.use(routes);

app.listen(5000, () => console.log("Server is running on http://localhost:5000..."));
