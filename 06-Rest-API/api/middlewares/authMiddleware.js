import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
   const token = req.headers("X-Authorization");

   if (!token) return next();

   try {
      const decoded = jwt.verify(token, "asdqwdqwxbafuywefhwe");
      req.user = decoded;
      next();
   } catch (err) {
      res.status(401).end();
   }
}
