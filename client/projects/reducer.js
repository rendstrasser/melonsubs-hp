export default function reducer(state={}, action) {
	switch(action.type) {
		case "app/store/INITIAL_DATA_FETCHED":
			return Object.assign({}, state, { elements: action.payload.projects });
			
		case "project/store/CREATED_SUCCESSFULLY":
			return Object.assign({}, state, { elements: [
        		...state.elements,
        		action.project
       		]})
		case "project/store/UPDATED_SUCCESSFULLY":
			return Object.assign({}, state, { elements: [
				...state.elements.filter((project) => project.id !== action.project.id),
				action.project
			]});
		case "project/store/DELETED_SUCCESSFULLY":
			return Object.assign({}, state, { elements: [
				...state.elements.filter((project) => project.id !== action.projectId),
				]})
		default:
			return state;
	}
}