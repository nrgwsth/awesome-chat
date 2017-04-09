import React,{Component} from 'react'
import {getAllUsers,getAllMessages,addNewMessageAction} from '../actions'
import {connect} from 'react-redux'
import {Grid, Col ,Row} from "react-bootstrap"
import {StyleSheet, css} from "aphrodite"

const styles = StyleSheet.create({
	
})

class Chatroom extends Component {
	constructor(props) {
		super(props);
		this.state={
			chat_box_hidden:false,
			selected_user:null,
			inputValue:""
		}
		const socket = this.props.socket;
		socket.emit("join",{
			userId:this.props.user.id
		})
	}
	
	componentDidMount() {
		this.props.getUserData();
		this.props.getMessageForThisUser();
		const socket = this.props.socket;
		const _this=this;
		socket.on("new message",function(message){
			_this.props.addNewMessage(message);
		})
	}

	handleClickOnUser(key) {
		this.setState({
			chat_box_hidden:true,
			selected_user:key
		})
	}

	handleChange(e) {
		this.setState({
			inputValue:e.target.value
		})
	}
	handleSubmit(e) {
		e.preventDefault();

		const message={
			sender:this.props.user.id,
			receiver:this.state.selected_user,
			message:this.state.inputValue
		}

		this.setState({
			inputValue:""
		})
		this.props.socket.emit('send message',message);
		this.props.addNewMessage(message);
	}
	render() {
		const chatboxStyle={
			width:"auto",
			height:"500px",
			overflowY:"auto",
			backgroundColor:"yellow"
		}
		const linkStyle = {
			color:"blue"
		}
		const headingStyle = {
			color: "#77773c"
		}
		const messageFloatingLeft = {
			float:"left",
			color: "#00ff00"
		}
		const messageFloatingRight = {
			float:"right",
			color:"#cc33ff"
		}
		return(
				
				<Row>
					<Col xs={4}>
						<div>		
							<ul>
								{this.props.users && this.props.users.map((user ,i)=>{
									if(user.id !== this.props.user.id) {
										return <a href="#" style={linkStyle}><li key={i} onClick={()=>this.handleClickOnUser(user.id)}>{user.displayName}</li></a>
									}
								})}
							</ul>
						</div>
					</Col>

					<Col xs={8}>
						{this.state.chat_box_hidden?

							<div>
								<div style={chatboxStyle}>
									{this.props.messages.map(message=>{
										if(message.sender===this.state.selected_user){
											return <li style={messageFloatingRight}>{message.message}</li>
										} else if(message.receiver===this.state.selected_user){
											return <li style={messageFloatingLeft}>{message.message}</li>
										}
									})}
								</div>
								<div>
									<form method="POST" onSubmit={this.handleSubmit.bind(this)}>
										<input type="text" onChange={this.handleChange.bind(this)} value={this.state.inputValue} /><br/>
										<button type="submit">Send</button>
									</form>
								</div>
							</div>

						:

							<div>
								<span>Select any user</span>
							</div>
						}
					</Col>
				</Row>

		)
	}
}

function mapStateToProps(state) {
	return state;
}
function mapDispatchToProps(dispatch) {
	return {
		getUserData: function(){dispatch(getAllUsers())},
		getMessageForThisUser:function(){dispatch(getAllMessages())},
		addNewMessage:function(message){dispatch(addNewMessageAction(message))}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Chatroom)