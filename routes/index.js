const express = require("express");
const app = express.Router();
var gcm = require('node-gcm');

const FCM_ApiKey = 'AIzaSyBLjM87tnh3s3r2lsKIrXUTw-Ufeopl8vU'

// Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
var sender = new gcm.Sender(FCM_ApiKey);




//POST REQUEST 

//add jobs in mongodb
app.get("/", (req, res) => {

    res.json('hello user')
})


app.post("/send", (req, res) => {

    console.log(req.body, 'reqbody')
    // Prepare a message to be sent
    var message = new gcm.Message({
        collapseKey: 'demo',
        priority: 'high',
        contentAvailable: true,
        delayWhileIdle: true,
        timeToLive: 3,
        // restrictedPackageName: "com.tryggare_privat",
        dryRun: false,
        data: {
            key1: 'message1',
            key2: 'message2'
        },
        notification: {
            title: req.body.title,
            // icon: "ic_launcher",
            body: req.body.body
        }
    });

    // Specify which registration IDs to deliver the message to
    var regTokens = [req.body.token];

    console.log(req.body, 'body')

    // Actually send the message
    sender.send(message, { registrationTokens: regTokens }, function (err, response) {
        if (err) console.error(err);
        else res.send(response);
    });

})


module.exports = app;