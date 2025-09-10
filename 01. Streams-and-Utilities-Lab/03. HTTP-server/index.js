import http from "http";

const server = http.createServer((req, res) => {
  console.log("Request received");

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const searchParams = parsedUrl.searchParams;

  console.log("Pathname:", parsedUrl.pathname);
  console.log("Search params:", Object.fromEntries(searchParams));

  res.writeHead(200, {
    "content-type": "text/html",
  });
  res.write("<h1>Hello from my first HTTP Server</h1>");
  res.end();
});

server.listen(5000);
console.log("Server is listening on port http://localhost:5000...");
