export function articleCreationFormSubmitted(htmlFormElem, authorId) {
	return {
		type: "article/request/CREATE",
		htmlFormElem,
        authorId
	}
}

export function articleCreatedSuccessfully(article) {
	return {
		type: "article/store/CREATED_SUCCESSFULLY", 
		article
	}
}

export function articleContentChanged(content) {
	return {
		type: "article/store/CONTENT_CHANGED",
		content
	}
}

export function articleUpdateFormSubmitted(htmlFormElem, authorId) {
	return {
		type: "article/request/UPDATE",
		htmlFormElem,
        authorId
	}
}

export function articleUpdatedSuccessfully(article) {
	return {
		type: "article/store/UPDATED_SUCCESSFULLY", 
		article
	}
}

export function deleteArticleTriggered(articleId) {
	return {
		type: "article/request/DELETE",
		articleId
	}
}

export function articleSuccessfullyDeleted(articleId) {
	return {
		type: "article/store/DELETED_SUCCESSFULLY", 
		articleId: articleId
	}
}