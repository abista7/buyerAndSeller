const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const nodemailer = require('nodemailer');
const axios = require('axios')

const { Kafka } = require('kafkajs')

const consumer = new Kafka({
    clientId: 'notification-server',
    brokers: [`kafka:${process.env.KAFKA_SERVER_PORT}`]
}).consumer({ groupId: 'notification-server' })

const kafkaTopic = process.env.KAFKA_TOPIC_NAME

const email = process.env.EMAIL

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: process.env.EMAIL_PASSWORD
    }
});

const app = express();

app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.NOTIFICATION_SERVER_PORT || 4006;

async function start() {
    try {
        await consumer.connect()
        await consumer.subscribe({ topic: kafkaTopic, fromBeginning: true })

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const { buyer, item } = JSON.parse(message.value)

                const res = await axios.get(`http://auth:${process.env.AUTH_SERVER_PORT}/api/auth/user/${item.seller}`)

                if (!res.data.valid) {
                    console.log(`Cannot sent email to user ${buyer}. User not found.`)
                    return;
                }

                const user = res.data.user;

                const mailOptions = {
                    from: email,
                    to: user.email,
                    subject: 'Sending Email about purchaise',
                    text: `Item ${item.name} was purchased by ${buyer}. Item description: ${item.description}. Item price: ${item.price}`
                };
                
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }
        })

        app.listen(PORT, () => console.log(`Receipt service has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
};

start()
