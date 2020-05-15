const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = process.env.AUTH_SERVER_PORT || 4000

async function start() {
    try {
        require("./db/mongo-pool").initPool();

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch(e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start();