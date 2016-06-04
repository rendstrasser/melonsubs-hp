import React, { Component } from 'react'

const IconButton = (props) => {
	const disabled = props.disabled ? "disabled" : "";


	return(
		<a className={"btn " + disabled}>
			<i className={"material-icons left " + props.className}>{props.icon}</i>{props.children}
		</a>
	)
}

IconButton.propTypes = {
	disabled: React.PropTypes.bool,
	className: React.PropTypes.string,
	icon: React.PropTypes.string.isRequired
}

IconButton.defaultProps = {
	disabled: false,
	className: "",
}

export default IconButton;