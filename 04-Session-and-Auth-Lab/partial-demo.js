import express from "express";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import bcrypt from "bcrypt";

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

// // HTTP Module set cookie method
// app.get("/set-cookie", (req, res) => {
//    res.writeHead(200, {
//       "set-cookie": "name=Pesho",
//    });
//    res.end();
// });

// // Express set cookie method
// app.get("/set-cookie2", (req, res) => {
//    res.header("set-cookie", "age=20");
//    res.end();
// });

// Express easiest way - Recommended
app.get("/set-cookies", (req, res) => {
   res.cookie("width", 190);
   res.cookie("height", 180);
   res.end();
});

// // Get cookie express way
// app.get("/get-cookies", (req, res) => {
//    const cookies = req.header("cookie");

//    console.log(cookies);
//    res.end(cookies);
// });

// Get cookies with cookieParser library - Recommended
app.get("/get-cookies2", (req, res) => {
   const cookies = req.cookies;
   //  console.log(cookies["name"]);
   console.log(cookies);

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

app.post("/register", (req, res) => {
   const { username, password } = req.body;

   console.log(username);
   console.log(password);

   res.end();
});

app.listen(5000, () => console.log("Server is running on port: http://localhost:5000..."));
