import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { browserHistory } from 'react-router'

import * as Saga from 'utils/sagas'
import * as Actions from './actions.js'

/**
	Create article
*/

export function* createArticleListener() {
  	yield* takeEvery("article/request/CREATE", createArticle);
}

function* createArticle(action) {
	try {
		const result = yield call(createArticleImpl, action.htmlFormElem, action.authorId);
		const dispatchedAction = yield Saga.authenticationWrapper(result, Actions.articleCreatedSuccessfully(result.article));

		// redirect on create
		if (dispatchedAction.type === "article/store/CREATED_SUCCESSFULLY") {
			browserHistory.push('/articles');
		}
	} catch(e) {
		console.warn(e);
	}
}

const createArticleImpl = (htmlFormElem, authorId) => {
	var articleContent = htmlFormElem.elements["content"].value;
	var createArticleRequest = Saga.buildFormRequest('/internal/article', htmlFormElem, "POST",
        [
            {key: "content", value: articleContent},
            {key: "authorId", value: authorId}
        ]);

	return fetch(createArticleRequest, Saga.includeCredentials)
		.then(Saga.status)
		.then(Saga.json);
}

/**
	Update article
*/

export function* updateArticleListener() {
  	yield* takeEvery("article/request/UPDATE", updateArticle);
}

function* updateArticle(action) {
	try {
		const result = yield call(updateArticleImpl, action.htmlFormElem, action.authorId);
		const dispatchedAction = yield Saga.authenticationWrapper(result, Actions.articleUpdatedSuccessfully(result.article));

		// redirect on update
		if (dispatchedAction.type === "article/store/UPDATED_SUCCESSFULLY") {
			browserHistory.push('/articles');
		}
	} catch(e) {
		console.warn(e);
	}
}

const updateArticleImpl = (htmlFormElem, authorId) => {
	var articleContent = htmlFormElem.elements["content"].value;
	var updateArticleRequest = Saga.buildFormRequest('/internal/article', htmlFormElem, "PUT",
        [
            {key: "content", value: articleContent},
            {key: "authorId", value: authorId}
        ]);

	return fetch(updateArticleRequest, Saga.includeCredentials)
		.then(Saga.status)
		.then(Saga.json);
}

/**
	Delete article
*/

export function* deleteArticleListener() {
  	yield* takeEvery("article/request/DELETE", deleteArticle);
}

function* deleteArticle(action) {
	try {
		const result = yield call(deleteArticleImpl, action.articleId);
		yield Saga.authenticationWrapper(result, Actions.articleSuccessfullyDeleted(action.articleId));
	} catch(e) {
		console.warn(e);
	}
}

const deleteArticleImpl = (articleId) => {
	var completeUrl = '/internal/article/' + ArticleId;
	var deleteArticleRequest = new Request(completeUrl, {
		method: "DELETE", 
	});

	return fetch(deleteArticleRequest, Saga.includeCredentials)
		.then(Saga.status)
		.then(Saga.json);
}
