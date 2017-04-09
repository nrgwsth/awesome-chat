"use strict";

const mongoose = require("mongoose"), Schema = mongoose.Schema;

const Message_Schema = new Schema({
	sender: String,
	receiver: String,
	message: String,
	time: {
		type: Date,
		default: Date.now()
	}
});

const Message = mongoose.model("RCMessage", Message_Schema);

module.exports = Message;