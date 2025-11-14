import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import "dotenv/config";

import routes from "./routes.js";
import pageHelpers from "./views/helpers/pageHelpers.js";

import { authMiddleware } from "./middlewares/authMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

// Setup Database
try {
   await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Myths-and-Legends",
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
         ...pageHelpers,
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
app.use(express.json());

// Use Auth Middleware
app.use(authMiddleware);

// Routes
app.use(routes);

// Global Error Handling
app.use(errorMiddleware);

app.listen(process.env.PORT, () => console.log(`Server is running on port http://localhost:${process.env.PORT}`));
