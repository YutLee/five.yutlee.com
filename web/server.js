const PORT = 4000;
const http = require('http');
const url=require('url');
const fs=require('fs');
const path=require('path');
// const mine=require('./mine').types;
const types = {
  "css": "text/css",
  "gif": "image/gif",
  "html": "text/html",
  "ico": "image/x-icon",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
  "json": "application/json",
  "pdf": "application/pdf",
  "png": "image/png",
  "svg": "image/svg+xml",
  "swf": "application/x-shockwave-flash",
  "tiff": "image/tiff",
  "txt": "text/plain",
  "wav": "audio/x-wav",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "xml": "text/xml"
};

const server = http.createServer(function (request, response) {
  let pathname = url.parse(request.url).pathname;
  pathname = pathname == '/' || !/\..*/.test(pathname) ? '/index.html' : pathname;
  const realPath = path.join(__dirname + '/dist', pathname);
  console.log(pathname, realPath);
  let ext = path.extname(realPath);
  ext = ext ? ext.slice(1) : 'unknown';
  fs.exists(realPath, function (exists) {
  if (!exists) {
      response.writeHead(404, {
        'Content-Type': 'text/plain'
      });

      response.write('This request URL ' + pathname + ' was not found on this server.');
      response.end();
    } else {
      fs.readFile(realPath, 'binary', function (err, file) {
        if (err) {
          response.writeHead(500, {
            'Content-Type': 'text/plain'
          });
          response.end(err);
        } else {
          const contentType = types[ext] || 'text/plain';
          response.writeHead(200, {
            'Content-Type': contentType
          });
          response.write(file, 'binary');
          response.end();
        }
      });
    }
  });
});
server.listen(PORT);
console.log('Server runing at port: ' + PORT + '.');
