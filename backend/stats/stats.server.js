// display stats: from lab 7
// need to have redis open

const express = require('express');
const redis = require('redis');
const app = express();
const client = redis.createClient(process.env.REDIS_SERVER_PORT, 'redis');
const port = process.env.STATS_SERVER_PORT;

app.get('/api/stats', (req, res) => {
    // res.send('Hello world!');
    client.publish('myPubSubChannel', `${process.env.NODE_APP_INSTANCE} has been visited`);
    const hits = [];

    client.get('/api/auth/login', (err, value) => {
        hits.push(`Login : ${value || 0} Visits!!`);
        client.get('/api/auth/register', (err, value) => {
            hits.push(`Register : ${value || 0} Visits!!`);
            res.send(hits.join("<br />") + "<br />");
        });
    });    
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));