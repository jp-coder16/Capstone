const http = require('http');

const server = http.createServer((re, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.removeHeader("X-Powered-By");
    res.end('Hello World');
})

server.listen(3000, ()=>{
    console.log("server is running port 3000");
})