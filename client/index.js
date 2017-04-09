"use strict";

import React from 'react'
import {Provider} from 'react-redux'
import {render} from 'react-dom'
import configureStore from "./store/configureStore"
import {Router,Route,browserHistory,Link} from "react-router"
import {setSocketObject, isUserLoggedIn} from './actions'
import Routes from "./routes"

const store = configureStore();

const socket = io();

store.dispatch(setSocketObject(socket));

store.dispatch(isUserLoggedIn());

render(
	<Provider store={store}>
		<Router children={Routes} history={browserHistory} />
	</Provider>,
	document.getElementById("app")
);