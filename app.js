var PORT = 8080;
var connect = require('connect');
var serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic(__dirname));
app.listen(PORT, function() {
  console.log("Server listening on port:", PORT);
});