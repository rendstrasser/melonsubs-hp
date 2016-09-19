export function imageUploaded(componentName, image) {
	return {
		type: "app/store/IMAGE_UPLOADED",
		componentName,
		image
	}
}

export function validationErrorOnImageUpload(componentName, errorMessage) {
	return {
		type: "app/store/IMAGE_UPLOAD_VALIDATION_ERROR",
		componentName,
		errorMessage
	}
}

export function showMultiMediaUploadPopupClicked(componentName) {
	return {
		type: "app/store/SHOW_POPUP_CLICKED",
		componentName: componentName
	}
}