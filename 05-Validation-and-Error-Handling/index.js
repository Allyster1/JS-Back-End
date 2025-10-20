import express from "express";
import handlebars from "express-handlebars";
import validator from "validator";
import mongoose from "mongoose";
import User from "./models/User.js";

const app = express();

await mongoose.connect("mongodb://localhost:27017", {
   dbName: "test-validation-25",
});

app.use(express.urlencoded({ extended: false }));

app.engine(
   "hbs",
   handlebars.engine({
      extname: "hbs",
   })
);

app.set("view engine", "hbs");

app.get("/", (req, res) => {
   res.render("home", { layout: false });
});

app.get("/register", (req, res) => {
   res.render("register", { layout: false });
});

app.post("/register", async (req, res) => {
   const formData = req.body;

   //  Validate email
   const isEmailValid = validator.isEmail(formData.email);

   if (!isEmailValid) {
      res.status(400).send("Email is invalid!");
   }

   const user = {
      ...formData,
      email: formData.email.trim().toLowerCase(),
   };

   // Steps for invalid data
   // 1. Return to register page
   // 2. Keep entered form data
   // 3. Show appropriate message

   try {
      const createdUser = await User.create(user);
      console.log(createdUser);
   } catch (err) {
      const firstErrorMessage = Object.values(err.errors).at(0).message;

      console.log(firstErrorMessage);

      // Keep the form data field
      return res.status(400).render("register", {
         user: formData,
         layout: false,
         error: firstErrorMessage,
      });
   }

   res.redirect("/");
});

app.listen(5000, () => console.log("Server is listening on http://localhost:5000..."));
