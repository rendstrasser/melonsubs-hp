import React, { Component } from 'react'
import { connect } from 'react-redux'

import { imageUploaded, validationErrorOnImageUpload } from './actions.js';

import './style/image-upload.scss'

class ImageUpload extends Component {

	constructor() {
	    super();
	    this.onImageChange = this.onImageChange.bind(this);
	    this.validateImage = this.validateImage.bind(this);
	    this.isValidFile = this.isValidFile.bind(this);
	    this.areFilesValid = this.areFilesValid.bind(this);
	    this.handleValidFile = this.handleValidFile.bind(this);
	    this.propagateClickToFileInput = this.propagateClickToFileInput.bind(this);
	    this.buildUploadedImageStoreKey = this.buildUploadedImageStoreKey.bind(this);
	    this.buildValidationErrorStoreKey = this.buildValidationErrorStoreKey.bind(this);
	    this.handleValidationError = this.handleValidationError.bind(this);
  	}

  	validateImage(file, img) {
  		const { width, height } = this.props;

  		if (width && width !== img.width) {
  			this.handleValidationError(`One of the files does not have the required width: ${width} px`);
  			return;
  		}

  		if (height && height !== img.height) {
  			this.handleValidationError(`One of the files does not have the required height: ${height} px`);
  			return;
  		}

  		this.handleValidFile(file);
  	}

  	isValidFile(file) {
  		const { maxFileSizeInKb, allowedFileTypes } = this.props;

  		if (!file) {
  			this.handleValidationError("Some unknown error happened.");
  			return false;
  		}

  		if (maxFileSizeInKb && file.size > maxFileSizeInKb*1024) {
  			this.handleValidationError(`One of the files is above the size limit: ${maxFileSizeInKb} kb`);
  			return false;
  		}

  		if (allowedFileTypes && !allowedFileTypes.includes(file.type)) {
  			this.handleValidationError(`One of the files is not of one of the allowed types: ${allowedFileTypes}`);
  			return false;
  		}

  		return true;
  	}

  	areFilesValid(files) {
  		if (!files && files[0]) {
			this.handleValidationError("No files have been selected.")
			return false;
		}

		if (files.length > 1) {
			this.handleValidationError("You can only select one image.")
			return false;
		}

		return true;
  	}

  	handleValidFile(file) {
  		const { name, onValidationSuccess, imageUploaded } = this.props;

  		const reader = new FileReader();

  		const _self = this;
        reader.onload = function (e) {
        	_self.handleValidationError(undefined);
        	onValidationSuccess(e.target.result);
        	imageUploaded(_self.buildUploadedImageStoreKey(), e.target.result);
        }

        reader.readAsDataURL(file);
  	}

  	handleValidationError(errorMessage) {
  		const { onValidationError, validationErrorOnImageUpload, showInlineValidationError } = this.props;

  		onValidationError(errorMessage);

  		if (showInlineValidationError) {
  			validationErrorOnImageUpload(this.buildValidationErrorStoreKey(), errorMessage);	
  		}
  	}

	onImageChange(elem) {
		const { width, height } = this.props;

		const files = elem.target.files;
		if (!this.areFilesValid(files)) {
			return;
		}

		var _URL = window.URL || window.webkitURL;
		for (var i = 0; i < files.length; i++) {
			const file = files[i];

			if (!this.isValidFile(file)) {
				return;
			}

			if (width || height) {
				var tempImg = new Image();
				tempImg.onload = () => this.validateImage(file, tempImg);
				tempImg.src = _URL.createObjectURL(file);
			} else {
				this.handleValidFile(file)
			}
		}
	}

	buildUploadedImageStoreKey() {
		const {name} = this.props;
		return `image-uploaded-${name}`;
	}

	buildValidationErrorStoreKey() {
		const {name} = this.props;
		return `image-upload-error-${name}`;
	}

	propagateClickToFileInput() {
		const inputElement = this.refs.imageUploadInput;
		inputElement.click();
	}

	render() {
		const { name, placeholder, previewImage, previewWidth, previewHeight, inputProps, imageUploadState, cardStyle } = this.props;

		const uploadedImage = imageUploadState[this.buildUploadedImageStoreKey()];
		const imgSource = uploadedImage || previewImage || placeholder;

		const curValidationError = imageUploadState[this.buildValidationErrorStoreKey()] || "";

		const coverCardStyle = Object.assign({
			width: previewWidth,
			margin: "0px"
		}, cardStyle);

		const imageUploadStyle = {
			height: previewHeight,
			width: previewWidth
		};

		return(
			<div className="card" style={coverCardStyle}>
				<div className="card-image">
					<div className="image-upload" style={imageUploadStyle}>
						<div className="image-upload-validation-error-overlay">{curValidationError}</div>
						<div className="image-upload-border-overlay" onClick={this.propagateClickToFileInput}></div>
						<img src={imgSource}/>
						<input type="file" name={name} className="image-upload-input" {...inputProps} onChange={this.onImageChange} multiple={false} value={undefined} ref="imageUploadInput"/>
					</div>
				</div>
			</div>
		)
	}
}

ImageUpload.propTypes = {
	name: React.PropTypes.string.isRequired,
	width: React.PropTypes.number,
	height: React.PropTypes.number,
	previewWidth: React.PropTypes.number.isRequired,
	previewHeight: React.PropTypes.number.isRequired,
	onValidationError: React.PropTypes.func,
	maxFileSizeInKb: React.PropTypes.number,
	allowedFileTypes: React.PropTypes.arrayOf(React.PropTypes.string),
	placeholder: React.PropTypes.string.isRequired,
	onValidationSuccess: React.PropTypes.func,
	previewImage: React.PropTypes.string,
	inputProps: React.PropTypes.object,
	showInlineValidationError: React.PropTypes.bool,
	cardStyle: React.PropTypes.object
}

ImageUpload.defaultProps = {
	inputProps: {},
	onValidationError: (() => {}),
	onValidationSuccess: (() => {}),
	maxFileSizeInKb: 1024,
	allowedFileTypes: ["image/png", "image/jpeg"],
	showInlineValidationError: true,
	cardStyle: {}
}

const mapStateToProps = (state) => {
	return {
		imageUploadState: state.app.basicRouteSpecificState.imageUpload
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		imageUploaded: ((componentName, image) => dispatch(imageUploaded(componentName, image))),
		validationErrorOnImageUpload: ((componentName, errorMessage) => dispatch(validationErrorOnImageUpload(componentName, errorMessage)))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
