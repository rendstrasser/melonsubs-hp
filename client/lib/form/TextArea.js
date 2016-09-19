import React, { Component } from 'react'

const TextArea = (props) => {
	const placeholder = props.placeholder === "" ? {} : {placeholder: props.placeholder};
	return(
		<div className="input-field">
			<textarea className={"materialize-textarea " + props.className} id={ props.id } {...placeholder} {...props.inputProps}/>
			<label className="active" htmlFor={ props.id }>{ props.label }</label>
		</div>
	)
}

TextArea.propTypes = {
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	className: React.PropTypes.string,
	placeholder: React.PropTypes.string,
	inputProps: React.PropTypes.object,
}

TextArea.defaultProps = {
	className: "",
	placeholder: "",
	inputProps: {}
}

export default TextArea