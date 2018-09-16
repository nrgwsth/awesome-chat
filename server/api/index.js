const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("./../models/User")
const Message = require("./../models/Message")

module.exports = function(app) {

	app.get("/isuserloggedin", function(req, res) {
		console.log("/isuserloggedin", req.user)
		res.json(req.user)
	})

	app.post("/api/user/messages", (req, res) => {
		Message.find({
			$or: [
				{
					sender: req.body.userId
				},
				{
					receiver: req.body.userId
				}
			]
		}).exec((err, messages) => {
			if (err) throw err
			console.log("all messages", messages)
			res.json(messages || [])
		})
	})

	app.get("/api/user/listing", isAuthenticated, async (req, res) => {
		let users
		try{
			users = await User.find({})
		} catch(e){
			throw e
		}
		res.json(users)
	})

	app.post("/api/message/create", (req, res) => {
		messageHandler(req.body.sender, req.body.receiver, req.body.message)
		res.status(200).send("ok")
	})

	app.post("/api/finduser", async (req, res)=>{
		let user
		try{
			user = await User.findOne({username: req.body.username})
		} catch(e){
			throw e
		}
		if(user){
			res.json({"CODE": "USER_EXISTS"})
		} else{
			res.json({"CODE": "USER_DOES_NOT_EXIST"})
		}
	})

	app.post("/api/login", async (req, res)=>{
		if(!req.body.username || !req.body.password){
			res.status(400).send({"CODE": "REQUIRED_PARAMETER_MISSING"})
			return
		}
		let user
		try{
			user = await User.findOne({username: req.body.username})
		} catch(e){
			throw e
		}

		if(user){
			const result = await bcrypt.compare(req.body.password, user.password)
			if(result){
				const jsonwebtoken = jwt.sign({_id: user._id, username: user.username}, "secret", { expiresIn: 24 * 60 * 60 })
				res.status(200).send({token: jsonwebtoken})
			} else{
				res.status(400).send({"CODE": "INCORRECT_PASSWORD"})
			}
		} else{
			const hash = await bcrypt.hash(req.body.password, 10)
			const user = new User({
				username: req.body.username,
				password: hash
			})

			try {
				newUser = await user.save()
			} catch(e){
				throw e
			}
			const jsonwebtoken = jwt.sign({_id: newUser._id, username: newUser.username}, "secret", { expiresIn: 24 * 60 * 60 })
			res.status(200).send({token: jsonwebtoken})
		}
	})

	function isAuthenticated(req, res, next){
		const Authorization = req.headers["authorization"],
		      token = Authorization.split("Bearer ")[1]

		let decodedToken = null
		try{
			decodedToken = jwt.verify(token, "secret")
		} catch(e){
			res.status(400).send({"CODE": "UNAUTHORIZED_ACCESS"})
		}
		if(decodedToken){
			req.user = {_id: decodedToken._id, username: decodedToken.username}
			next()
		}
	}

	app.get("/api/isSignedin", isAuthenticated, function(req,res){
		res.send("Hello World")
	})

	app.get("/api/getAllRooms", isAuthenticated, function(req, res){
		const rooms = Room.find({owner: null})
	})

	app.get("/*", function(req, res) {
		res.send(renderFullPage())
	})
}

function messageHandler(sender, receiver, message) {
	var message = new Message({
		sender: sender,
		to: receiver,
		message: message
	})

	message.save(err => {
		if (err) throw err
	})
}

function renderFullPage() {
	return `
    <!doctype html>
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <title>React Redux Socket.io Chat</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css">
    	<script defer src="https://use.fontawesome.com/releases/v5.1.0/js/all.js"></script>

        <style>
            #app{height: 100%;}
        </style>
      </head>
      <body>
        <section class="section"><div id="app"></div></section>
        <script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `
}
