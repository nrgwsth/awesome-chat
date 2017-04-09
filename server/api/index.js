"use strict";
const User = require("./../models/User")
const Message = require("./../models/Message")

module.exports = function(app) {

    app.get("/", function(req, res) {
        res.send(renderFullPage());
    });

    app.get("/isuserloggedin", function(req, res) {
        console.log("/isuserloggedin", req.user);
        res.json(req.user);
    });

    app.post("/api/user/messages", (req, res) => {

        Message.find({
            '$or': [{
                sender: req.body.userId
            }, {
                receiver: req.body.userId
            }]
        }).exec((err, messages) => {
            if (err) throw err;
            console.log("all messages",messages);
            res.json(messages || []);
        });
    });

    app.get("/api/user/listing", (req, res) => {
        User.find({}).exec((err, users) => {
            if (err) throw err;
            res.json(users);
        });
    });

    app.post("/api/message/create", (req, res) => {
        messageHandler(req.body.sender, req.body.receiver, req.body.message);
        res.status(200).send("ok");
    });
}


function messageHandler(sender, receiver, message) {
    var message = new Message({
        sender: sender,
        to: receiver,
        message: message
    });

    message.save((err)=>{
        if(err) throw err;
    });
}

function renderFullPage() {
    return `
    <!doctype html>
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <title>React Redux Socket.io Chat</title>

        <style>
            #app{height: 100%;}
        </style>
      </head>
      <body>
        <div id="app"></div>
        <script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `

}