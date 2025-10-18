import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constants.js";

export default function authMiddleware(req, res, next) {
   const token = req.cookies("auth");

   if (!token) return next();

   try {
      const decodeToken = jwt.verify(token, JWT_SECRET);

      // Attach auth user to request
      req.user = decodeToken;
      req.isAuthenticated = true;

      next();
   } catch (err) {
      // Invalid user
      res.clearCookie("auth");

      res.redirect("/auth/login");
   }
}
