const MongoPool = require("../db/mongo-pool");
const { ObjectId } = require('mongodb')
const items = require('express').Router()

const ITEMS = "items"
const MONGO_DB = process.env.MONGO_DB

items.get('/item/:itemId', async (req, res) => {
    const id = req.params.itemId;

    if (id === '') {
        return res.json({ valid: false, message: "Data is incorrect" })
    }

    MongoPool.getInstance(async function (db) {
        try {
            const item = await db.db(MONGO_DB)
                .collection(ITEMS)
                .findOne({ _id: ObjectId(id) })

            if (!item) {
                return res.json({
                    valid: false,
                    message: `Item with id ${id} not found`
                })
            }

            res.json({
                valid: true,
                item
            });
        } catch (e) {
            console.log(e);
            res.send('Error', e);
        }
    })
})

items.delete('/item/:itemId', async (req, res) => {
    const id = req.params.itemId;

    if (id === '') {
        return res.json({ valid: false, message: "Data is incorrect" })
    }

    MongoPool.getInstance(async function (db) {
        try {
            await db.db(MONGO_DB)
                .collection(ITEMS)
                .remove({ _id: ObjectId(id) })

            res.json({ valid: true });
        } catch (e) {
            console.log(e);
            res.json({ valid: false, message: e.message });
        }
    });
});

items.post('/item', async (req, res) => {
    const { name, price, description, seller } = req.body;

    var validEntry =
        (name !== '') &&
        (price !== '') &&
        (description !== '') &&
        (seller !== '')

    if (!validEntry) {
        return res.json({ valid: false, message: "Data is incorrect" })
    }

    MongoPool.getInstance(async function (db) {
        try {
            const numTimeSold = 0;
            const purchasers = [];

            const item = (await db.db(MONGO_DB)
                .collection(ITEMS)
                .insertOne({ 
                    name, 
                    price, 
                    description, 
                    seller,
                    numTimeSold,
                    purchasers
                }))
                .ops[0]

            res.json({
                valid: true,
                item
            });
        } catch (e) {
            console.log(e);
            res.json({ valid: false, message: e.message });
        }
    })
})

items.get('/items', async (req, res) => {
    MongoPool.getInstance(async function (db) {
        try {
            const items = await db.db(MONGO_DB)
                .collection(ITEMS)
                .find({})
                .toArray()

            res.json({
                valid: true,
                items
            });
        } catch (e) {
            console.log(e);
            res.send('Error', e);
        }
    });
});

module.exports = items;