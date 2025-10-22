export function tempDataMiddleware(req, res, next) {
   // Create redirect function
   Object.defineProperty(res, "tempData", {
      set(values) {
         req.session.tempData = values;
      },
      get() {
         // TODO: Fix getter
         return req.session.tempData;
      },
   });

   if (!req.session.tempData) {
      return next();
   }

   res.locals = Object.assign(res.locals, req.session.tempData);

   req.session.tempData = null;
   next();
}
