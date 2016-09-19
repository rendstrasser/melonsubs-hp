import { put } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'

import * as Actions from 'core/actions'

export function status(response) {  
	if (response.status >= 200 && response.status < 300) {  
    	return Promise.resolve(response)  
  	} else {  
    	return Promise.reject(new Error(response.statusText))  
  	}  
}

export function json(response) {  
	return response.json()  
}

export const includeCredentials = {
	credentials: "same-origin"
};

export function buildFormRequest(url, form, method = 'POST', additionalProps = []) {
	const formData = new FormData(form);

	// add timezone offset
	formData.set("timezoneOffset", new Date().getTimezoneOffset());

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

export function authenticationWrapper(fetchResult, successAction, errorMessage = undefined) {
	if (fetchResult.error) {
		return put(Actions.userLogInFailure(errorMessage === undefined ? fetchResult.error : errorMessage));
	} else {
		return put(successAction);
	}
}