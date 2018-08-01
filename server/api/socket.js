var users = []
const Message = require("./../models/Message")

function messageHandler(sender, receiver, message) {
	var message = new Message({
		sender: sender,
		receiver: receiver,
		message: message
	})

	message.save(err => {
		if (err) throw err
	})
}

module.exports = function(io) {
	io.on("connection", function(socket) {
		console.log("a user connected")
		socket.on("join", function(data) {
			users.push({
				id: socket.id,
				userId: data.userId
			})
			console.log("new user joined\nusers ::: ", users)
		})
		socket.on("send message", function(message) {
			messageHandler(message.sender, message.receiver, message.message)
			var to
			for (var i = 0; i < users.length; i++) {
				if (users[i].userId == message.receiver) {
					to = users[i].id
				}
			}

			socket.broadcast.to(to).emit("new message", message)
			console.log("sent meassage to this user", to)
		})
		socket.on("disconnect", function() {
			for (var i = 0; i < users.length; i++) {
				if (users[i].id == socket.id) {
					users.splice(i, 1) //Removing single user
				}
			}
			console.log("user disconnected") //sending list of users
		})
	})
}
