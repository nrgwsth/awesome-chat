import axios from "axios"

export function LoginAPI(username, password){
	return axios.post("/api/login", {username: username, password: password})
}

export function CheckUserameAPI(username){
	return axios.post("/api/finduser", {username: username})
}