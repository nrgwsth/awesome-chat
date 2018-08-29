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

	app.get("/api/user/listing", (req, res) => {
		User.find({}).exec((err, users) => {
			if (err) throw err
			res.json(users)
		})
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
			console.log(decodedToken)
			next()
		}
	}

	app.get("/api/isSignedin", isAuthenticated, function(req,res){
		res.send("Hello World")
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
