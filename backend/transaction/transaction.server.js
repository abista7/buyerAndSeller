const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const MongoPool = require("./db/mongo-pool")
const { Kafka } = require('kafkajs')
 
const producer = new Kafka({
  clientId: 'transaction-server',
  brokers: [`kafka:${process.env.KAFKA_SERVER_PORT}`]
}).producer()

const kafkaTopic = process.env.KAFKA_TOPIC_NAME

const TRANSACTIONS = "transactions"
const MONGO_DB = process.env.MONGO_DB

const app = express();

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.TRANSACTION_SERVER_PORT || 4004;

app.post('/api/transaction', async (req, res) => {
    MongoPool.getInstance(async function (db) {
        const item = req.body.item
        const buyer = req.body.buyer

        if (item === '' || buyer === '') {
            return res.json({ valid: false, message: "Data is incorrect" })
        }

        try {
            const transaction = (await db.db(MONGO_DB)
                .collection(TRANSACTIONS)
                .insertOne({
                    timeOfPurchase: Date.now(),
                    buyer,
                    item: item,
                }))
                .ops[0]

            try {
                await producer.connect()
            } catch(e) {
                console.log("Kafka hasn't been connected", e.message)
                process.exit(1)
            }

            await producer.send({
                topic: kafkaTopic,
                messages: [{ value: JSON.stringify(transaction) }],
            })
    
            res.send({
                valid: true
            })
        } catch (e) {
            res.send({
                valid: false,
                message: e.message
            })
        }
    })    
})

async function start() {
    try {
        MongoPool.initPool();

        app.listen(PORT, () => console.log(`Transaction service has been started on port ${PORT}...`))
    } catch(e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
};

start()
