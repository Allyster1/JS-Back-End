import express from "express";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const users = [];
const JWT_SECRET = "rqasdnqwdndamsQWEXCSA";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
   expressSession({
      secret: "dasdwdcsadfosaeifndsfndifndsi", // should come from env
      resave: false, // if no changes don't save
      saveUninitialized: true, // save session for every user, even if it has no info
      cookie: { secure: false }, // secure for HTTPS
   })
);

app.get("/", (req, res) => {
   res.send("it works!");
});

// Express easiest way - Recommended
app.get("/set-cookies", (req, res) => {
   res.cookie("width", 190);
   res.cookie("height", 180);
   res.end();
});

// Set session using express-session library
app.get("/set-session", (req, res) => {
   req.session.name = "Gosho";
   req.session.age = Math.floor(Math.random() * 100);

   res.send("Session is created");
});

// Get session info
app.get("/get-session", (req, res) => {
   console.log(req.session);

   res.send(`Welcome ${req.session.name}, age ${req.session.age}`);
});

// Register
app.get("/register", (req, res) => {
   res.send(`
      <form method="POST">
         <div>
            <label for="username">Username</label>
            <input type="text" id="username" name="username" />
         </div>
         <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" />
         </div>

         <div>
            <input type="submit" value="Register" />
         </div>
      </form>
      `);
});

app.post("/register", async (req, res) => {
   const { username, password } = req.body;

   const salt = await bcrypt.genSalt(12);
   const hash = await bcrypt.hash(password, salt);

   const user = {
      id: users.length,
      username: hash,
   };

   users.push(user);
   res.redirect("/login");
});

// Login
app.get("/login", (req, res) => {
   res.send(`
      <form method="POST">
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
      `);
});

app.post("/login", async (req, res) => {
   const { username, password } = req.body;

   const user = users.find((u) => u.username === username);
   if (!user) return res.send("No such user!");

   const isPasswordValid = await bcrypt.compare(password, user.password);
   if (!isPasswordValid) return res.send("Invalid Password!");

   // Issue JWT Token
   const payload = {
      id: user.id,
      username: user.username,
      admin: false,
   };

   const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
   // Can also put it in res (usual for React, as they can parse and manage it)
   // Attach token to cookie - easiest
   res.cookie("auth", token);

   res.redirect("/profile");
});

app.get("/profile", (req, res) => {
   const token = req.cookies["auth"];

   // Validate token
   try {
      const decodeToken = jwt.verify(token, JWT_SECRET);
      res.send(`Welcome ${decodeToken.username}`);
   } catch (err) {
      res.status(401).send("Unauthorized");
   }
});

app.listen(5000, () => console.log("Server is running on port: http://localhost:5000..."));
