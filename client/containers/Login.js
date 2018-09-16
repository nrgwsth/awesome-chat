import React, {Component} from "react"
import {connect} from "react-redux"

import {CheckUserameAPI, login} from "./../actions/"

@connect()
class Login extends Component{
	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: "",
			step: 0
		}
	}

	onRegisterClick = async ()=>{
		const {data} = await CheckUserameAPI(this.state.username)
		this.setState({
			usernameUsed: data.CODE === "USER_EXISTS",
			step: 1
		})
	}

	onLoginClick = async ()=>{
		this.props.dispatch(login(this.state.username, this.state.password))
	}

	render(){
		return (
			<div className="loginWrapper">
				<div className="logo">
					awesome_chat
				</div>
				{this.state.step === 0 &&
					<div className="form">
						<div className="inputWrapper">
							<input
								name="usename"
								placeholder = "Enter a username"
								value = {this.state.username}
								onChange = {e=>this.setState({username: e.target.value})}
							/>
						</div>
						<button className="loginButton" onClick = {this.onRegisterClick}>
							<span>Continue</span>
						</button>
					</div>
				}
				{this.state.step === 1 &&
					<div className="form">
						<div className="has-small-vertical-margin">
							<span className="is-size-6 has-text-white has-text-left">
								{this.state.usernameUsed ? "User found" : "Set a new password"}
							</span>
						</div>
						<div className="inputWrapper">
							<input
								name="password"
								type="password"
								placeholder = "Enter password"
								value = {this.state.password}
								onChange = {e=>this.setState({password: e.target.value})}
							/>
						</div>
						<button className="loginButton" value = {this.state.username} onChange = {e=>this.setState({username: e.target.value})} onClick = {this.onLoginClick}>
							<span>Login</span>
						</button>
					</div>
				}
			</div>
		)
	}
}

export default Login