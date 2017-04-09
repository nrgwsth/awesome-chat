const INTIAL_STATE = {
	user: null,
	socket: null,
	users: [],
	messages: []
};
export default function reducer(state = INTIAL_STATE, action){
	switch(action.type){
		case "SET_SOCKET_OBJECT":
			return {
				...state,
				socket: action.socket
			}

		case "userauth":
			return {
				...state,
				user: action.user
			}

		case "SET_USER_DATA":
			return{
				...state,
				users: action.users
			}

		case "SET_USER_MESSAGES":
			return{
				...state,
				messages: action.messages
			}

		case "ADD_NEW_MESSAGE":
			return {
				...state,
				messages: [...state.messages, action.message]
			}
		default:
			return state;
	}
}