import React from "react"
import { Row, Col } from "react-bootstrap"
import { StyleSheet, css } from "aphrodite"

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: "#efefef",
		padding: "10px",
		margin: "0 0 10px 0"
	},
	div: {
		float: "left"
	},
	navBrand: {
		fontSize: "1.5em",
		fontWeight: "bolder",
		color: "#444"
	}
})
const Nav = props => {
	return (
		<Row>
			<Col xs={12} className={css(styles.wrapper)}>
				{props.navs.map((nav, i) => (
					<div
						className={css(styles.div, nav.isbrand === true && styles.navBrand)}
					>
						<a href={nav.path}>{nav.title}</a>
					</div>
				))}

				{props.children}
			</Col>
		</Row>
	)
}

export default Nav
