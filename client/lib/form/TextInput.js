import React, { Component } from 'react'

const TextInput = (props) => {
	const placeholder = props.placeholder === "" ? {} : {placeholder: props.placeholder};
	return(
		<div className="input-field">
			<input type="text" id={props.id} {...placeholder} {...props.inputProps}/>
			<label className="active" htmlFor={props.id}>{ props.label }</label>
		</div>
	)
}

TextInput.propTypes = {
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	placeholder: React.PropTypes.string,
	inputProps: React.PropTypes.object,
}

TextInput.defaultProps = {
	placeholder: "",
	inputProps: {}
}

export default TextInput;