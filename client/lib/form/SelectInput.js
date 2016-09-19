import React, { Component } from 'react'

import 'materialize-css/dist/js/materialize.js'
import 'materialize-css/sass/materialize.scss'

function renderMaterialSelect(elem) {
	$(elem).material_select();
}

const SelectInput = (props) => {
	const { withDefaultOption, selectedOption, id, label, inputProps, options, defaultText} = props;
	
	const DefaultOption = withDefaultOption ? <option value="" disabled>{defaultText}</option> : "";
	const initialValue = inputProps.initialValue ? inputProps.initialValue : selectedOption;

	inputProps.value = initialValue;

	return(
		<div className="input-field">
			<select className="material-select" id={id} {...inputProps} ref={renderMaterialSelect}>
				{DefaultOption}
				{options.map((option) => {
					return(
						<option key={option} value={option}>{option}</option>
					)
				})}
			</select>
		    <label className="active" htmlFor={id}>{label}</label>
		</div>
	)	
}

SelectInput.propTypes = {
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	defaultText: React.PropTypes.string,
	withDefaultOption: React.PropTypes.bool,
	selectedOption: React.PropTypes.string,
	inputProps: React.PropTypes.object,
	options: React.PropTypes.arrayOf(React.PropTypes.string),
}

SelectInput.defaultProps = {
	withDefaultOption: false,
	defaultText: "Choose",
	selectedOption: undefined,
	inputProps: {},
	options: []
}

export default SelectInput;

