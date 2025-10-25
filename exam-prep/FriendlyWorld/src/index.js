import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";

import routes from "./routes.js";
import cookieParser from "cookie-parser";

import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();

// Setup Database
try {
   await mongoose.connect("mongodb://localhost:27017", {
      dbName: "Friendly-world",
   });
   console.log("Database connected successfully!");
} catch (err) {
   console.error("Cannot connect to database", err.message);
}

// Config handlebars
app.engine(
   "hbs",
   handlebars.engine({
      extname: "hbs",
      runtimeOptions: {
         allowProtoPropertiesByDefault: true,
         allowProtoMethodsByDefault: true,
      },
      helpers: {
         setTitle(title) {
            this.pageTitle = title;
         },
         getTitle() {
            return this.pageTitle || "Friendly World";
         },
      },
   })
);

app.set("view engine", "hbs");
app.set("views", "src/views");

// Static middleware
app.use(express.static("src/public"));

// Cookie parser
app.use(cookieParser());

// Body parser
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Use Auth Middleware
app.use(authMiddleware);

// Routes
app.use(routes);

app.listen(5000, () => console.log("Server is running on port http://localhost:5000"));
