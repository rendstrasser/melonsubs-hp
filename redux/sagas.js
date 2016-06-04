import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { browserHistory } from 'react-router'
import md5 from 'md5'

import * as Actions from './actions.js'

function status(response) {  
	if (response.status >= 200 && response.status < 300) {  
    	return Promise.resolve(response)  
  	} else {  
    	return Promise.reject(new Error(response.statusText))  
  	}  
}

function json(response) {  
	return response.json()  
}

const includeCredentials = {
	credentials: "same-origin"
};

function buildFormRequest(url, form, method = 'POST', additionalProps = []) {
	const formData = new FormData(form);
	for (const additionalProp of additionalProps) {
		formData.set(additionalProp.key, additionalProp.value);
	}

	// If the form contains an input field with the name 'id' 
	// then it is expected that the url should be extended by the id according
	// to REST best practices for resources.
	let completeUrl = url;
	const id = formData.get("id");
	if (id) {
		completeUrl += "/" + id;
	}

	return new Request(completeUrl, {
		method: method, 
		body: formData
	});
}

function authenticationWrapper(fetchResult, successAction, errorMessage = undefined) {
	if (fetchResult.error) {
		return put(Actions.userLogInFailure(errorMessage === undefined ? fetchResult.error : errorMessage));
	} else {
		return put(successAction);
	}
}

/**

	Initial Data Fetching Sagas

**/

const getInitialDataImpl = () => {
	return fetch('/internal/initialData', includeCredentials)
		.then(status)
		.then(json)
};

function* getInitialData(action) {
	try {
		const initialData = yield call(getInitialDataImpl);
		yield authenticationWrapper(initialData, Actions.initialDataFetched(initialData, action.returnTo));
	} catch(e) {
		console.warn(e);
	}
}

export function* getInitialDataListener() {
	yield* takeEvery("app/request/INITIAL_DATA", getInitialData);
}

/**

	Login Sagas

**/
// TODO: rename!!
export function* loginSubmittedSaga() {
	yield* takeEvery("app/request/LOGIN", loginSubmittedSagaImpl)
}

function* loginSubmittedSagaImpl(action) {
	try {
		const result = yield call(postLoginForm, action.htmlFormElem);
		yield authenticationWrapper(result, Actions.userLogInSuccess(result.user), "The email or the password is wrong.");
	} catch(e) {
		console.warn(e);
	}
}

const postLoginForm = (htmlFormElem) => {
	const hashedPw = md5(htmlFormElem.elements["password"].value);
	var postLoginRequest = buildFormRequest('/auth/login', htmlFormElem, 'POST', [{key: "password", value: hashedPw}]);

	return fetch(postLoginRequest, includeCredentials)
		.then(status)
		.then(json);
}


/**

	Add Project Sagas

**/

export function* postProjectListener() {
  	yield* takeEvery("project/request/CREATE", postProject);
}

const postProjectImpl = (htmlFormElem) => {
	var postProjectRequest = buildFormRequest('/internal/project', htmlFormElem);

	return fetch(postProjectRequest, includeCredentials)
		.then(status)
		.then(json);
}

function* postProject(action) {
	try {
		const result = yield call(postProjectImpl, action.htmlFormElem);
		yield authenticationWrapper(result, Actions.projectCreatedSuccessfully(result.project));
	} catch(e) {
		console.warn(e);
	}
}


/**

	Update Project Sagas

**/

export function* updateProjectListener() {
  	yield* takeEvery("project/request/UPDATE", putProject);
}

const putProjectImpl = (htmlFormElem) => {
	var putProjectRequest = buildFormRequest('/internal/project', htmlFormElem, "PUT");

	return fetch(putProjectRequest, includeCredentials)
		.then(status)
		.then(json);
}

function* putProject(action) {
	try {
		const result = yield call(putProjectImpl, action.htmlFormElem);
		const dispatchedAction = yield authenticationWrapper(result, Actions.projectUpdatedSuccessfully(result.project));
		if (dispatchedAction.type === "project/store/UPDATED_SUCCESSFULLY") {
			browserHistory.push('/projects');
		}
	} catch(e) {
		console.warn(e);
	}
}

/**

	Delete Project Sagas

**/

export function* deleteProjectListener() {
  	yield* takeEvery("project/request/DELETE", deleteProject);
}

function* deleteProject(action) {
	try {
		const result = yield call(deleteProjectImpl, action.projectId);
		yield authenticationWrapper(result, Actions.projectSuccessfullyDeleted(action.projectId));
	} catch(e) {
		console.warn(e);
	}
}

const deleteProjectImpl = (projectId) => {
	var completeUrl = '/internal/project/' + projectId;
	var deleteProjectRequest = new Request(completeUrl, {
		method: "DELETE", 
	});

	return fetch(deleteProjectRequest, includeCredentials)
		.then(status)
		.then(json);
}
