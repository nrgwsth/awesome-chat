"use strict"

const mongoose = require("mongoose"),
	Schema = mongoose.Schema

var User_Schema = new Schema({
	id: String,
	username: String,
	displayName: String,
	photo: String
})

const User = mongoose.model("BSUser", User_Schema)

User.findOrCreate = function(data, cb) {
	User.findOne({
		id: data.id
	}).exec(function(err, user) {
		if (user) {
			cb(err, user)
		} else {
			const user = new User()

			user.id = data.id

			user.username = data.profile.username
			user.displayName = data.profile.displayName
			user.photo = data.profile.photos[0].value

			user.save()

			cb(err, user)
		}
	})
}

module.exports = User
