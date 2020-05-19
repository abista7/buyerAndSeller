// display stats: from lab 7
// need to have redis open

const express = require('express');
const redis = require('redis');
const app = express();
const client = redis.createClient();
const port = 3001;

app.get('/api/stats/get', (req, res) => {
    // res.send('Hello world!');
    client.publish('myPubSubChannel', `${process.env.NODE_APP_INSTANCE} has been visited`);
    client.incr('myCounter', (err, updatedValue) => {
    // this is after redis responds
        console.log('Hitting service', process.env.NODE_APP_INSTANCE);
        res.send(`Hello from instance: ${process.env.NODE_APP_INSTANCE}, ${updatedValue} Visits!!!`);
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));