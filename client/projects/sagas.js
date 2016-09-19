import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { browserHistory } from 'react-router'

import * as Saga from 'utils/sagas'
import * as Actions from './actions.js'

/**
	Create project
*/

export function* createProjectListener() {
  	yield* takeEvery("project/request/CREATE", createProject);
}

function* createProject(action) {
	try {
		const result = yield call(createProjectImpl, action.htmlFormElem);
		const dispatchedAction = yield Saga.authenticationWrapper(result, Actions.projectCreatedSuccessfully(result.project));
		if (dispatchedAction.type === "project/store/CREATED_SUCCESSFULLY") {
			browserHistory.push('/projects');
		}
	} catch(e) {
		console.warn(e);
	}
}

const createProjectImpl = (htmlFormElem) => {
	var createProjectRequest = Saga.buildFormRequest('/internal/project', htmlFormElem);

	return fetch(createProjectRequest, Saga.includeCredentials)
		.then(Saga.status)
		.then(Saga.json);
}

/**
	Update project
*/

export function* updateProjectListener() {
  	yield* takeEvery("project/request/UPDATE", updateProject);
}

function* updateProject(action) {
	try {
		const result = yield call(updateProjectImpl, action.htmlFormElem);
		const dispatchedAction = yield Saga.authenticationWrapper(result, Actions.projectUpdatedSuccessfully(result.project));
		if (dispatchedAction.type === "project/store/UPDATED_SUCCESSFULLY") {
			browserHistory.push('/projects');
		}
	} catch(e) {
		console.warn(e);
	}
}

const updateProjectImpl = (htmlFormElem) => {
	var updateProjectRequest = Saga.buildFormRequest('/internal/project', htmlFormElem, "PUT");

	return fetch(updateProjectRequest, Saga.includeCredentials)
		.then(Saga.status)
		.then(Saga.json);
}

/**
	Delete project
*/

export function* deleteProjectListener() {
  	yield* takeEvery("project/request/DELETE", deleteProject);
}

function* deleteProject(action) {
	try {
		const result = yield call(deleteProjectImpl, action.projectId);
		yield Saga.authenticationWrapper(result, Actions.projectSuccessfullyDeleted(action.projectId));
	} catch(e) {
		console.warn(e);
	}
}

const deleteProjectImpl = (projectId) => {
	var completeUrl = '/internal/project/' + projectId;
	var deleteProjectRequest = new Request(completeUrl, {
		method: "DELETE", 
	});

	return fetch(deleteProjectRequest, Saga.includeCredentials)
		.then(Saga.status)
		.then(Saga.json);
}
