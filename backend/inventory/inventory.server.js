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

app.use('/api/inventory', require('./routes/inventory.routes'))

const PORT = process.env.INVENTORY_SERVER_PORT || 4001

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