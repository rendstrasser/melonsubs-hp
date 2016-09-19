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