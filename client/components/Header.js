import React, { Component } from 'react'
import {Jumbotron} from "react-bootstrap"
import {StyleSheet, css} from "aphrodite"

const styles = StyleSheet.create({
	"header":{
		textAlign: "center"
	}
})
const Header = ({heading})=>{
	return(

		<Jumbotron className={css(styles.header)}>
			<h2>{heading}</h2>
		</Jumbotron>
	);
}

export default Header