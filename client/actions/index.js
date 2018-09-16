import fetch from "isomorphic-fetch"
import { browserHistory } from "react-router"

const cookieName = "rcuser"

export function getAllUsers() {
	return function(dispatch) {
		return fetch("/api/user/listing")
			.then(r => r.json())
			.then(json => {
				dispatch({
					type: "SET_USER_DATA",
					users: json
				})
			})
	}
}

export function getAllMessages() {
	return (dispatch, getState) => {
		const userId = getState().user.id
		return fetch("/api/user/messages", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			method: "POST",
			body: JSON.stringify({
				userId: userId
			})
		})
			.then(r => r.json())
			.then(json => {
				console.log(json)
				dispatch({
					type: "SET_USER_MESSAGES",
					messages: json
				})
			})
	}
}

export function addNewMessageAction(message) {
	return function(dispatch) {
		dispatch({
			type: "ADD_NEW_MESSAGE",
			message: message
		})
	}
}

export function setSocketObject(socket) {
	return {
		type: "SET_SOCKET_OBJECT",
		socket: socket
	}
}

export function loginAction(username, password) {
	return dispatch => {
		console.log("sending login request")
		fetch("/api/user/verify", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			method: "POST",
			body: JSON.stringify({
				username: username,
				password: password
			})
		})
			.then(response => response.json())
			.then(responseJson => {
				console.log(responseJson)
				browserHistory.push("/")
			})
	}
}

export function isUserLoggedIn() {
	return dispatch => {
		if (localStorage.getItem(cookieName) !== null) {
			const user = JSON.parse(localStorage.getItem(cookieName))
			dispatch({
				type: "userauth",
				user: user
			})

			browserHistory.push("/")
		} else {
			return fetch("/isuserloggedin", { credentials: "include" })
				.then(response => response.json())
				.then(json => {
					console.log("is user logged in ", json)

					dispatch({
						type: "userauth",
						user: json
					})

					if (json) {
						browserHistory.push("/")
						localStorage.setItem(cookieName, JSON.stringify(json))
					} else {
						browserHistory.push("/login")
					}
				})
		}
	}
}

export function logout() {
	localStorage.removeItem(cookieName)
	return {
		type: "LOGOUT"
	}
}

export function loginUser(username){
	return axios.post("/api/createuser", {username})
}

export * from "./api"
export * from "./auth"
