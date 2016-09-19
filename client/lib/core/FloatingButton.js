import React, { Component } from 'react'
import { Link } from 'react-router'

import './style/floating-button.scss'

import 'materialize-css/sass/materialize.scss'
import 'materialize-css/js/materialize.js'

const FloatingButton = (props) => {
	const { to, parentClassName, text, size, fontSize } = props;

	return(
		<div className={"floatingButton " + parentClassName} style={{fontSize: fontSize + "rem"}}>
			<Link to={to} className={"btn-floating btn-" + size + " waves-effect waves-light"}>{props.children}</Link>
		</div>
	)
}

FloatingButton.propTypes = {
	to: React.PropTypes.string.isRequired,
	parentClassName: React.PropTypes.string,
	size: React.PropTypes.string,
	fontSize: React.PropTypes.string
}

FloatingButton.defaultProps = {
	size: "large",
	fontSize: "2"
}


export default FloatingButton