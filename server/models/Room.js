"use strict"

const mongoose = require("mongoose"),
	Schema = mongoose.Schema

var Room_Schema = new Schema({
	name: String,
	owner: {
		type: Array
	}
})

const Room = mongoose.model("BSRoom", Room_Schema)

module.exports = Room
