export default function reducer(state={}, action) {
	switch(action.type) {
		case "app/store/INITIAL_DATA_FETCHED":
			const { title, allowedProjectStatuses, allowedProjectTypes, user, projects } = action.payload;
			const returnTo = action.returnTo;
			const lastInitialDataLoadedTimestamp = Date.now();
			return Object.assign({}, state, { title, allowedProjectStatuses, allowedProjectTypes, user, lastInitialDataLoadedTimestamp, returnTo, projects });
		case "app/store/RESET_ROUTE_SPECIFIC_VALUES":
			return Object.assign({}, state, { currentAddProjectCoverImg: undefined });

		case "app/store/LOGIN_SUCCESS":
			return Object.assign({}, state, {user: action.user, logInError: ""})

		case "app/store/LOGIN_FAILURE":
			return Object.assign({}, state, {logInError: action.error, user: undefined})

		case "project/store/COVER_IMG_VALIDATION_ERROR":
			return Object.assign({}, state, { currentAddProjectCoverImgValidationError: action.text })
		case "project/store/CREATED_SUCCESSFULLY":
			return Object.assign({}, state, { projects: [
        		...state.projects,
        		action.project
       		]})
		case "project/store/UPDATED_SUCCESSFULLY":
			return Object.assign({}, state, { projects: [
				...state.projects.filter((project) => project.id !== action.project.id),
				action.project
			]});
		case "project/store/DELETED_SUCCESSFULLY":
			return Object.assign({}, state, { projects: [
				...state.projects.filter((project) => project.id !== action.projectId),
				]})

		default: 
			console.warn("Reducer action " + action.type + " not yet supported.");
			return state;
	}
}