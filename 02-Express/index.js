import path, { extname } from "node:path";
import express from "express";
import handlebars from "express-handlebars";

import userRouter from "./userRouter.js";
import {
  loggerMiddleware,
  userLoginLoggerMiddleware,
} from "./middlewares/logger.js";

const app = express();

// Add view engine to express
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
  })
);

// Use specific view engine
app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/home", (req, res) => {
  res.render("home", { title: "My Home Page!" });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/list", (req, res) => {
  const users = [
    { name: "Pesho", age: 18 },
    { name: "Gosho", age: 18 },
    { name: "Ivan", age: 18 },
    { name: "Sofronii", age: 18 },
  ];

  const isAdmin = true;

  res.render("list", { users, isAdmin });
});

app.get("/login", userLoginLoggerMiddleware, (req, res) => {
  res.send(`
        <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="./css/style.css">
        <title>Login</title>
      </head>
      <body>
        <form action="/login" method="post">
          <div>
            <label for="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>

          <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>

          <div>
            <input type="submit" value="Login" />
          </div>
        </form>
      </body>
    </html>

    `);
});

app.post("/login", (req, res) => {
  res.send("Successful login!");
});

// Using parameters
app.get("/cats/:catId/details", (req, res) => {
  res.send(`Cat Details: ID: ${req.params.catId}`);

  res.end();
});

// Send Json
app.get("/data", (req, res) => {
  res.json({
    name: "Petar",
    age: 22,
  });
});

// // Download file
// app.get("/send-file", (req, res) => {
//   res.sendFile(path.resolve("./monster.jpg"));
// });

// // Download file attachment
// app.get("/send-file-download", (req, res) => {
//   res.attachment("monster.jpg");
//   res.sendFile(path.resolve("./monster.jpg"));
// });

// Download file attachment shortcut
app.get("/send-attachment", (req, res) => {
  res.download("./monster.jpg", "monster.jpg");
});

// Redirect
app.get("/redirect", (req, res) => {
  res.redirect("/");
});

// Using modular router
app.use("/user", userRouter);

// Wildcard url with error page for all methods
app.all("/*splat", (req, res) => {
  res.send("Page Not Found!");
});

app.listen(5000, () =>
  console.log("Server is listening on http://localhost:5000")
);
