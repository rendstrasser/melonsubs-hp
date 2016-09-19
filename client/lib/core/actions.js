export function userLogInFailure(error) {
	return {
		type: "app/store/LOGIN_FAILURE",
		error
	}
}

export function activateUnfocusPageOverlay(handleOverlayDeactivation) {
	return {
		type: "app/store/ACTIVATE_UNFOCUS_PAGE_OVERLAY",
		handleOverlayDeactivation
	}
}

export function deactivateUnfocusPageOverlay() {
	return {
		type: "app/store/DEACTIVATE_UNFOCUS_PAGE_OVERLAY",
	}
}

export function closePopup(componentName) {
	return {
		type: "app/store/CLOSE_POPUP",
		componentName
	}
}