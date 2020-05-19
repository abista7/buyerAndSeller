// from lab7

const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const port = process.env.PORT || 3004;

const apiProxy = httpProxy.createProxyServer();

apiProxy.on('error', (err, req, res) => {
  console.log(err)
  res.status(500).send('Proxy Error');
});

// app.all("/api/auth/authenticate", (req, res) => {
//   apiProxy.web(req, res, {
//     target: 'http://localhost:3001',
//   });
// });

// app.all("/api/auth/create", (req, res) => {
//   apiProxy.web(req, res, {
//     target: 'http://localhost:3002',
//   });
// });

// just to test
app.all("/api/stats/get", (req, res) => {
    apiProxy.web(req, res, {
        target: 'http://localhost:3001',
    });
});

app.all("*", (req, res) => {
  // front end server / react
  apiProxy.web(req, res, {
    target: 'http://localhost:3000',
  });
});

app.listen(port, () => console.log(`Gateway on port ${port}!`))