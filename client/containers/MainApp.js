import React, { Component } from "react"
import { connect } from "react-redux"
import { browserHistory, Link } from "react-router"
import { Grid } from "react-bootstrap"
import { StyleSheet, css } from "aphrodite"

import Chatroom from "./Chatroom"
import Logout from "./../components/Logout"
import Nav from "./../components/Nav"

const styles = StyleSheet.create({
	wrapper: {
		height: "100%"
	}
})

class MainApp extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {}

	handleLogoutClick() {
		this.props.logout()
		browserHistory.push("/login")
	}

	render() {
		const nav = [
			{
				title: "Awesome Chat",
				path: "/",
				isbrand: true
			}
		]

		if (this.props.user) {
			return (
				<Grid className={css(styles.wrapper)}>
					<Nav navs={nav}>
						<Logout handleLogoutClick={this.handleLogoutClick} />
					</Nav>

					<Chatroom />
				</Grid>
			)
		} else {
			browserHistory.push("/login")
			return (
				<div>
					<p>You are not logged in.</p>
					<Link to="/login">login here</Link>
				</div>
			)
		}
	}
}

function mapStateToProps(state) {
	return state
}

function mapdispatchToProps(dispatch) {
	return {
		logout: () => {
			return dispatch(logout())
		}
	}
}

export default connect(
	mapStateToProps,
	mapdispatchToProps
)(MainApp)
