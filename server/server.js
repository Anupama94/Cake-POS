const http = require('http');
const app = require('./app');
//TODO add a config folder 
const port = process.env.PORT || 3001;

const server = http.createServer();
//making changes
server.listen(port);