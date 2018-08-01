import React, {Component} from "react"
import {Route} from "react-router"

import Home from "./Home"
import Login from "./Login"

class App extends Component{
	render(){
		return (
			<div>
				<Route path = "/" component = {Home} />
				<Route path = "/login" component = {Login} />
			</div>
		)
	}
}

export default App