import React, { Component } from 'react'

const CheckBox = (props) => {
	const { id, label, checked, inputProps } = props;
	const checkedAttr = checked ? "checked='checked'" : ""; 

	return(
		<div className="input-field">
			<input type="checkbox" className="filled-in" id={id} {...checkedAttr} {...inputProps} />
      		<label htmlFor={id}>{label}</label>
		</div>
	)
}

CheckBox.propTypes = {
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	checked: React.PropTypes.bool,
	inputProps: React.PropTypes.object,
}

CheckBox.defaultProps = {
	checked: false,
	inputProps: {}
}

export default CheckBox;

