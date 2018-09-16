import React, {Component} from "react"
import {Route, Switch} from "react-router-dom"
import {connect} from "react-redux"

import Home from "./Home"
import Login from "./Login"
import history from "./../history"

@connect(state=>state)
class App extends Component{
	componentDidMount(){
		if(this.props.user){
		} else{
			history.push("/login")
		}
	}

	render(){
		return (
			<div class="app">
				<Switch>
					<Route path = "/login" component = {Login} />
					<Route exact path = "/" component = {Home} />
				</Switch>
			</div>
		)
	}
}

export default App