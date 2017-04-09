"use strict";

module.exports = function(app, passport) {

	app.get("/auth/twitter", passport.authenticate("twitter"));

	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect: "/",
			failureRedirect: '/login'
		}));

	app.get("/auth/facebook", passport.authenticate("facebook"));

	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect: "/",
			failureRedirect: '/login'
		}));

}