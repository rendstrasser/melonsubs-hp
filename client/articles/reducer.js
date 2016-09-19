export default function reducer(state={}, action) {
	switch(action.type) {
		case "app/store/INITIAL_DATA_FETCHED":
			return Object.assign({}, state, { elements: action.payload.articles });

		case "app/store/RESET_ROUTE_SPECIFIC_VALUES":
			return Object.assign({}, state, { currentArticleContent: "" });

		case "article/store/CONTENT_CHANGED":
			return Object.assign({}, state, { currentArticleContent: action.content })

		case "article/store/CREATED_SUCCESSFULLY":
			console.log(action);
			return Object.assign({}, state, { elements: [
        		...state.elements,
        		action.article
       		]});
		case "article/store/UPDATED_SUCCESSFULLY":
			return Object.assign({}, state, { elements: [
				...state.elements.filter((article) => article.id !== action.article.id),
				action.article
			]});
		case "article/store/DELETED_SUCCESSFULLY":
			return Object.assign({}, state, { elements: [
				...state.elements.filter((article) => article.id !== action.articleId)
				]});
		default:
			return state;
	}
}