import React, { Component } from 'react'

function doNothing() {
}

const IconButton = (props) => {
	const { disabled, className, style, icon, onClick } = props;
	const disabledClass = disabled ? "disabled" : "";

	return(
		<a className={"btn " + disabledClass} style={style} onClick={onClick}>
			<i className={"material-icons left " + className}>{icon}</i>{props.children}
		</a>
	)
}

IconButton.propTypes = {
	disabled: React.PropTypes.bool,
	className: React.PropTypes.string,
	style: React.PropTypes.object,
	icon: React.PropTypes.string.isRequired,
	onClick: React.PropTypes.func
}

IconButton.defaultProps = {
	disabled: false,
	style: {},
	className: "",
	onClick: doNothing
}

export default IconButton;