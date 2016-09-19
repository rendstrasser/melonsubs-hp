function updateNestedRouteSpecificProp(state, nestingStateName, nestedPropName, nestedPropValue) {
	const newNestedState = Object.assign({}, state.basicRouteSpecificState[nestingStateName], { [nestedPropName] : nestedPropValue })
	const newBasicRouteSpecificState = Object.assign({}, state.basicRouteSpecificState, {[nestingStateName]: newNestedState})
	return Object.assign({}, state, { basicRouteSpecificState: newBasicRouteSpecificState });
}

export default function reducer(state={}, action) {
	switch(action.type) {
		case "app/store/INITIAL_DATA_FETCHED":
			const { title, allowedProjectStatuses, allowedProjectTypes, user } = action.payload;
			const returnTo = action.returnTo;
			const lastInitialDataLoadedTimestamp = Date.now();
			return Object.assign({}, state, { title, allowedProjectStatuses, allowedProjectTypes, user, lastInitialDataLoadedTimestamp, returnTo });

		case "app/store/RESET_ROUTE_SPECIFIC_VALUES":
			return Object.assign({}, state, { basicRouteSpecificState: { imageUpload: {}, mediaUpload: {}, popup: {}}});

		case "app/store/LOGIN_SUCCESS":
			return Object.assign({}, state, {user: action.user, logInError: ""})

		case "app/store/LOGIN_FAILURE":
			return Object.assign({}, state, {logInError: action.error, user: undefined})

		case "app/store/IMAGE_UPLOADED": {
			return updateNestedRouteSpecificProp(state, "imageUpload", action.componentName, action.image);
		}
		case "app/store/IMAGE_UPLOAD_VALIDATION_ERROR": {
			return updateNestedRouteSpecificProp(state, "imageUpload", action.componentName, action.errorMessage);
		}
		case "app/store/SHOW_POPUP_CLICKED": {
			return updateNestedRouteSpecificProp(state, "popup", action.componentName, true);
		}
		case "app/store/ACTIVATE_UNFOCUS_PAGE_OVERLAY": {
			return updateNestedRouteSpecificProp(state, "popup", "handleOverlayDeactivation", action.handleOverlayDeactivation)
		}
		case "app/store/DEACTIVATE_UNFOCUS_PAGE_OVERLAY": {
			return updateNestedRouteSpecificProp(state, "popup", "handleOverlayDeactivation", undefined)
		}
		case "app/store/CLOSE_POPUP": {
			return updateNestedRouteSpecificProp(state, "popup", action.componentName, undefined)
		}
		default:
			return state;
	}
}