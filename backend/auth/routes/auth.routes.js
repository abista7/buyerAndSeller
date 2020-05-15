const MongoPool = require("../db/mongo-pool");
const auth = require('express').Router()

const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_SERVER_PORT, 'redis');

const USERS = "users"
const MONGO_DB = process.env.MONGO_DB

auth.get('/login', async (req, res) => {
    if (!req.query.password || !req.query.user) {
        return res.json({ valid: false, message: "Data is missing" });
    }

    console.log('check login');

    MongoPool.getInstance(async function (db) {
        try {
            const doc = await db.db(MONGO_DB)
                .collection(USERS)
                .findOne({ user: req.query.user })

            console.log(doc);

            if (!doc || doc.password !== req.query.password) {
                return res.json({ valid: false, message: "Username or password is incorrect" });
            }

            redisClient.incr('/api/auth/login', (err, updatedValue) => { });

            res.json({
                valid: true,
                user: {
                    email: doc.email,
                    role: doc.role
                }
            });
        } catch (e) {
            console.log(e);
            res.send('Error', e);
        }
    });
});

auth.post('/register', async (req, res) => {
    console.log(req.body);

    const { user, password, email, role } = req.body;

    const validEntry =
        (password !== '') &&
        (email.includes('@')) &&
        (user !== '') &&
        (role !== '')

    if (!validEntry) {
        return res.json({ valid: false, message: "Data is incorrect" })
    }

    MongoPool.getInstance(async (db) => {
        db = db.db(MONGO_DB)

        try {
            const users = await db.collection(USERS)
                .find({ $or: [{ user }, { email }] })
                .toArray();
            
            if (users.length > 0) {
                return res.json({ valid: false, message: "User with same user and/or email already exists." })
            }

            const userToCreate = { user, email, password, role }

            await db.collection(USERS).insertOne(userToCreate);

            redisClient.incr('/api/auth/register', (err, updatedValue) => { });

            res.json({ valid: true })
        } catch (e) {
            return res.json({ valid: false, message: "Database error.", em: e.message })
        }
    })
});



module.exports = auth;