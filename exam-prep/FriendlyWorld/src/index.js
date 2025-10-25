import express from "express";

import routes from "./routes.js";

const app = express();

// Static middleware
app.use(express.static("src/public"));

// Body parser
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(routes);

app.listen(5000, () => console.log("Server is running on port http://localhost:5000"));
