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
