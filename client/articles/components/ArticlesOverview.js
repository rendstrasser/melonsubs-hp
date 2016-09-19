import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Row from 'core/Row'
import Col from 'core/Col'
import Modal from 'core/Modal'
import FloatingButton from 'core/FloatingButton'
import { deleteArticleTriggered } from '../actions'

import './style/article-overview.scss'

var deleteId = undefined;
function showDeleteDialog(event, currentId) {
	// prevent event bubbling to Link component onClick listener
	event.preventDefault();
	deleteId = currentId;
}

function renderModalTrigger(elem) {
	$(elem).leanModal();
}

function deleteArticle(handleDeleteArticleTriggered) {
	handleDeleteArticleTriggered(articleId);
}

const ArticlesOverview = (props) => {
	const { articles, handleDeleteArticleTriggered } = props; 
	return(
		<div>
			<Modal id="delete-modal" className="delete-modal" onAgreeClick={() => deleteArticle(handleDeleteArticleTriggered)}>
				<div className="delete-modal-title">Delete article?</div>
			    <div className="delete-modal-content">Do you really want to delete this article? Once it's deleted there is no possibility to bring it back.</div>
			</Modal>
			<Row>
				<Col>
					This is the article overview page.
				</Col>
			</Row>
			<FloatingButton to="/articles/set" parentClassName="addButton">+</FloatingButton>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		articles: state.articles.elements	
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleDeleteArticleTriggered: ((articleId) => dispatch(deleteArticleTriggered(articleId)))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesOverview);