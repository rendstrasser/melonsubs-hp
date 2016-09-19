import React, { Component } from 'react'
import { connect } from 'react-redux'

import CreateOrEditArticle from './CreateOrEditArticle.js'

import { getElemById } from 'utils/media'
import { normalizeEmptyFormValue } from 'utils/form'
import { articleCreationFormSubmitted, articleUpdateFormSubmitted, articleContentChanged } from '../actions.js'

const CreateOrEditArticleContainer = (props) => {
	const { id } = props.params;
	const { handleSubmitForCreate, handleSubmitForUpdate, handleContentChanged, authorId } = props;

	const inputProps = {}
	const article = getElemById(id, props.articles);

	inputProps.handleFormSubmit = handleSubmitForCreate;
    inputProps.handleContentChanged = handleContentChanged;
    inputProps.authorId = authorId;
    
	if (article) {
		inputProps.initialValues = {
			id: article.id,
  		}

  		inputProps.handleFormSubmit = handleSubmitForUpdate;
	}

	return(
		<CreateOrEditArticle {...inputProps} />
	)
}

const mapStateToProps = (state) => {
	return {
		articles: state.articles.elements,
        authorId: state.app.user.id
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleSubmitForCreate:  ((htmlFormElem, authorId) => dispatch(articleCreationFormSubmitted(htmlFormElem, authorId))),
		handleSubmitForUpdate:  ((htmlFormElem, authorId) => dispatch(articleUpdateFormSubmitted(htmlFormElem, authorId))),
        handleContentChanged: (content =>  dispatch(articleContentChanged(content)))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditArticleContainer);

