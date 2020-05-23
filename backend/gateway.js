const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const port = process.env.PORT || 3004;
const cors = require('cors')
const apiProxy = httpProxy.createProxyServer();

app.use(cors());
apiProxy.on('error', (err, req, res) => {
  console.log(err)
  res.status(500).send('Proxy Error');
});

app.all("/api/stats", (req, res) => {
    console.log('hello');
    apiProxy.web(req, res, {
        target: 'http://localhost:3001',
    });
});

app.all("/api/populateItems", (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:4001',
  });
});

app.all("/api/login", (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:4000',
  });
});

app.all("/api/register", (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:4000',
  });
});

app.all("/api/transaction", (req, res) => {
  apiProxy.web(req, res, {
      target: 'http://localhost:4002',
  });
});

app.all("/api/notification", (req, res) => {
  apiProxy.web(req, res, {
      target: 'http://localhost:4006',
  });
});

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