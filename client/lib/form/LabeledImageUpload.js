import React, { Component } from 'react'

import ImageUpload from './ImageUpload'

const LabeledImageUpload = (props) => {
	const { label } = props;

	return (
		<div className="input-field">
			<label className="active" for="header" style={{top: "-0.4rem"}}>{label}:</label>
			<ImageUpload {...props} />
		</div>
	);
}

LabeledImageUpload.PropTypes = Object.assign({}, ImageUpload.PropTypes, {
	label: React.PropTypes.string.isRequired,
})

export default LabeledImageUpload;