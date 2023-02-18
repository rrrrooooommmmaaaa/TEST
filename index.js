//SERVER

const http = require('http');
const https = require('https');
const app = require ('./app');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`APP started an port ${PORT}`);
});