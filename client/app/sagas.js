import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import md5 from 'md5'

import * as Saga from 'utils/sagas'
import * as Actions from './actions.js'

/**
	Initial Data Fetching Sagas
**/

export function* getInitialDataListener() {
	yield* takeEvery("app/request/INITIAL_DATA", getInitialData);
}

function* getInitialData(action) {
	try {
		const initialData = yield call(getInitialDataImpl);
		yield Saga.authenticationWrapper(initialData, Actions.initialDataFetched(initialData, action.returnTo));
	} catch(e) {
		console.warn(e);
	}
}

const getInitialDataImpl = () => {
	return fetch('/internal/initialData', Saga.includeCredentials)
		.then(Saga.status)
		.then(Saga.json)
};

/**
	Login Sagas
**/

export function* loginListener() {
	yield* takeEvery("app/request/LOGIN", login)
}

function* login(action) {
	try {
		const result = yield call(loginImpl, action.htmlFormElem);
		yield Saga.authenticationWrapper(result, Actions.userLogInSuccess(result.user), "The email or the password is wrong.");
	} catch(e) {
		console.warn(e);
	}
}

const loginImpl = (htmlFormElem) => {
	const hashedPw = md5(htmlFormElem.elements["password"].value);
	var loginRequest = Saga.buildFormRequest('/auth/login', htmlFormElem, 'POST', [{key: "password", value: hashedPw}]);

	return fetch(loginRequest, Saga.includeCredentials)
		.then(Saga.status)
		.then(Saga.json);
}
