import React from "react"
import {StyleSheet, css} from "aphrodite"
import {logout} from "./../actions";

const styles = StyleSheet.create({
	wrapper:{
		float: "right"
	},

	button:{
		border: "none",
		backgroundColor: "#999",
		padding: "5px 10px",
		color: "#fff",
		transition: "background-color 0.5s",

		':hover':{
			backgroundColor: "#bbb"
		}
	}
	
})

const Logout = (props)=>{
	return(
		<div className={css(styles.wrapper)}>
			<button onClick={props.handleLogoutClick.bind(this)} className={css(styles.button)}>Logout</button>
		</div>	
	)
}



export default Logout