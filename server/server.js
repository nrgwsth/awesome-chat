"use strict";

const express = require("express");
const app = express();
const passport = require("passport");
const PORT = process.env.PORT || 3000;

const dotenv = require("dotenv");

const mongoose = require("mongoose");

const bluebird = require("bluebird");

//const favicon = require("serve-favicon");

const path = require("path");

const configurePassport = require("./api/auth/configPassport");

const config = require("./config/webpack.config.js");

const webpack = require("webpack");

const compiler = webpack(config);


process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
	// application specific logging, throwing an error, or other logic here
});

process.on('uncaughtException', (err) => {
	console.log(`Caught exception: ${err}`);
	process.exit()
});

app.use(express.static(path.resolve(__dirname, "./../client/app")));

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require("body-parser").json());
app.use(require('body-parser').urlencoded({
	extended: true
}));
app.use(require('express-session')({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

dotenv.config();

mongoose.Promise = bluebird;

//app.use(favicon(path.resolve(__dirname, './../client/favicon.ico')));

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

mongoose.connect(process.env.MONGO_URL ? process.env.MONGO_URL : "mongodb://localhost/reactchat", function(err) {
	if (err) {
		throw err;
	} else {
		console.log("Successfully connected to mongodb server");
	}
});

configurePassport(passport);

require("./api/auth/")(app, passport);
require("./api/")(app);

var http = require("http").Server(app);

http.listen(PORT, function(error) {
	if (error) {
		console.error(error)
	} else {
		console.info("==> 🌎  Listening on port %s. Open up %s in your browser.", PORT, PORT);
	}
})

function messageHandler(from, to, message) {
	var message = {
		from: from,
		to: to,
		message: message
	}
	User.findOne({
		userId: from
	}).exec(function(err, data) {
		if (!err) {
			console.log(data);
			data.messages.push(message);
			data.save();
			User.findOne({
				userId: to
			}).exec(function(err, data2) {
				data2.messages.push(message);
				data2.save();
			})
		} else {

		}
	})
}

var io = require("socket.io")(http);

require("./api/socket")(io);