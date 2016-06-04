import React, { Component } from 'react'

import '../style/image-upload.scss'

class ImageUpload extends Component {

	constructor() {
	    super();
	    this.onImageChange = this.onImageChange.bind(this);
	    this.validateImage = this.validateImage.bind(this);
	    this.isValidFile = this.isValidFile.bind(this);
	    this.areFilesValid = this.areFilesValid.bind(this);
	    this.handleValidFile = this.handleValidFile.bind(this);
  	}

  	validateImage(file, img) {
  		const { width, height, onValidationError } = this.props;

  		if (width && width !== img.width) {
  			onValidationError("One of the files does not have the required width: " + width + " px");
  			return;
  		}

  		if (height && height !== img.height) {
  			onValidationError("One of the files does not have the required height: " + height + " px");
  			return;
  		}

  		this.handleValidFile(file);
  	}

  	isValidFile(file) {
  		const { maxFileSizeInKb, allowedFileTypes, onValidationError } = this.props;

  		if (!file) {
  			onValidationError("Some unknown error happened.");
  			return false;
  		}

  		if (maxFileSizeInKb && file.size > maxFileSizeInKb*1024) {
  			onValidationError("One of the files is above the size limit: " + maxFileSizeInKb + " kb");
  			return false;
  		}

  		if (allowedFileTypes && !allowedFileTypes.includes(file.type)) {
  			onValidationError("One of the files is not of one of the allowed types: " + allowedFileTypes);
  			return false;
  		}

  		return true;
  	}

  	areFilesValid(files) {
  		const { multiple, onValidationError } = this.props;

  		if (!files && files[0]) {
			onValidationError("No files have been selected.")
			return false;
		}

		if (!multiple && files.length > 1) {
			onValidationError("You can only select one image.")
			return false;
		}

		return true;
  	}

  	handleValidFile(file) {
  		const { onValidationSuccess, onValidationError } = this.props;

  		const reader = new FileReader();

        reader.onload = function (e) {
        	onValidationError(undefined);
        	onValidationSuccess(e.target.result);
        }

        reader.readAsDataURL(file);
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

	render() {
		const { name, placeholder, previewImage, previewWidth, previewHeight, inputProps, multiple } = this.props;
		const imgSource = previewImage || placeholder;

		const imageUploadStyle = {
			height: previewHeight + "px",
			width: previewWidth + "px"
		};

		return(
			<div className="image-upload" style={imageUploadStyle}>
				<img src={imgSource}/>
				<input type="file" name={name} className="image-upload-input" {...inputProps} onChange={this.onImageChange} multipe={multiple} value={undefined}/>
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
	multiple: React.PropTypes.bool,
	placeholder: React.PropTypes.string.isRequired,
	onValidationSuccess: React.PropTypes.func.isRequired,
	previewImage: React.PropTypes.string,
	inputProps: React.PropTypes.object
}

ImageUpload.defaultProps = {
	inputProps: {},
	onValidationError: (() => {}),
	maxFileSizeInKb: 1024,
	allowedFileTypes: ["image/png", "image/jpeg"],
	multiple: false
}

export default ImageUpload
