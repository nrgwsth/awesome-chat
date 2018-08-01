import React, { Component } from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { Router } from "react-router-dom"

import history from "./history"
import configureStore from "./store/configureStore"
import App from "./containers/App.js"

const store = configureStore()

render(
	<Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>,
	document.getElementById("app")
)
