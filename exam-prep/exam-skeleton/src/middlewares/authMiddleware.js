import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
   const token = req.cookies["auth"];

   if (!token) {
      return next();
   }

   try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decodedToken;
      req.isAuthenticated = true;

      // Add to handlebars locals
      res.locals.user = decodedToken;
      res.locals.isAuthenticated = true;

      next();
   } catch (err) {
      res.clearCookie("auth");
      res.redirect("/users/login");
   }
}

export function isAuth(req, res, next) {
   if (!req.isAuthenticated) {
      return res.redirect("/users/login");
   }

   next();
}

export function isGuest(req, res, next) {
   if (req.isAuthenticated) {
      return res.redirect("/");
   }

   next();
}
