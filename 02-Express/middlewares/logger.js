export function loggerMiddleware(req, res, next) {
  console.log(`HTTP Request: ${req.method} - ${req.url}`);
  next();
}


export function userLoginLoggerMiddleware(req, res, next) {
  console.log(`User has been logged`);
  next()
}