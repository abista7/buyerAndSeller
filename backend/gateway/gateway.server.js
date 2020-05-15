const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const port = process.env.GATEWAY_SERVER_PORT;

const apiProxy = httpProxy.createProxyServer();

apiProxy.on('error', (err, req, res) => {
  console.log(err)
  res.status(500).send('Proxy Error');
});

app.all("/api/stats", (req, res) => {
    console.log('hello');
    apiProxy.web(req, res, {
        target: 'http://auth:4002',
    });
});

app.all("*", (req, res) => {
  // front end server / react
  apiProxy.web(req, res, {
    target: 'http://localhost:3000',
  });
});

app.listen(port, () => console.log(`Gateway on port ${port}!`))