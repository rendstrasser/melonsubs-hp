/**
	Base actions
*/

export function reloadInitialData(returnTo) {
	return {
		type: "app/request/INITIAL_DATA",
		returnTo
	}
}

export function initialDataFetched(result, returnTo) {
	return { 
		type: "app/store/INITIAL_DATA_FETCHED", 
		payload: result, 
		returnTo: returnTo
	}
}

export function resetRouteSpecificValues() {
	return {
		type: "app/store/RESET_ROUTE_SPECIFIC_VALUES"
	}
}

/**
	Add project actions
*/

export function addProjectCoverImgValidationError(text) {
	return {
		type: "project/store/COVER_IMG_VALIDATION_ERROR",
		text
	}
}

export function projectCreationFormSubmitted(htmlFormElem) {
	return {
		type: "project/request/CREATE",
		htmlFormElem
	}
}

export function projectCreatedSuccessfully(project) {
	return {
		type: "project/store/CREATED_SUCCESSFULLY", 
		project
	}
}

export function projectUpdateFormSubmitted(htmlFormElem) {
	return {
		type: "project/request/UPDATE",
		htmlFormElem
	}
}

export function projectUpdatedSuccessfully(project) {
	return {
		type: "project/store/UPDATED_SUCCESSFULLY", 
		project
	}
}

export function deleteProjectTriggered(projectId) {
	return {
		type: "project/request/DELETE",
		projectId
	}
}

export function projectSuccessfullyDeleted(projectId) {
	return {
		type: "project/store/DELETED_SUCCESSFULLY", 
		projectId: projectId
	}
}

/**
	Login actions
*/

export function loginSubmitted(htmlFormElem) {
	return {
		type: "app/request/LOGIN",
		htmlFormElem
	}
}

export function userLogInSuccess(user) {
	return {
		type: "app/store/LOGIN_SUCCESS",
		user
	}
}

export function userLogInFailure(error) {
	return {
		type: "app/store/LOGIN_FAILURE",
		error
	}
}