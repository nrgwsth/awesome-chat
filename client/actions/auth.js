import axios from "axios"

import {LoginAPI} from "./api"

export function login(username, password){
	return async (dispatch)=>{
		let data
		try{
			data = await LoginAPI(username, password)
		} catch(e){
			debugger
		}
		debugger
	}
}
