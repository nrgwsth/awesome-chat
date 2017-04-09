import React,{Component} from "react";
import {Grid, Row, Col, Button} from "react-bootstrap"

import Header from "./Header"
import {StyleSheet, css} from "aphrodite"

const styles = StyleSheet.create({
	btnCustom:{
		borderRadius: "0px",
		margin: "5px",
		width: "200px"
	},
	btnWrapper:{
		backgroundColor: "#efefef",
		padding: "30px",
		textAlign: "center" 
	}
});


const Login = (props)=>{
	
	return(
		<Grid>
			<Row>
				<Col xs={12} md={12}>
					<Header heading = {"Login"} />
				</Col>
			</Row>

			<Row>		
				<Col xs={6} xsOffset={3} className={css(styles.btnWrapper)}>
					<div>
						<Button bsStyle="primary" bsSize="large" href="/auth/facebook" className={css(styles.btnCustom)}>Login With Facebbok</Button>
						<Button bsStyle="primary" bsSize="large" href="/auth/twitter" className={css(styles.btnCustom)}>Login With Twitter</Button>
					</div>
				</Col>	
			</Row>
		</Grid>
	)
	
}

export default Login