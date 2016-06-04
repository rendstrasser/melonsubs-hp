import React, { Component } from 'react'

const PasswordInput = (props) => {
	return(
		<div className="input-field">
			<input type="password" id={props.id} {...props.inputProps}/>
			<label className="active" htmlFor={props.id}>{ props.label }</label>
		</div>
	)
}

PasswordInput.propTypes = {
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	inputProps: React.PropTypes.object,
}

PasswordInput.defaultProps = {
	inputProps: {}
}

export default PasswordInput;