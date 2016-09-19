import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import Row from 'core/Row'
import Col from 'core/Col'
import TextInput from 'form/TextInput'
import SubmitButton from 'form/SubmitButton'
import CheckBox from 'form/CheckBox'
import Form from 'form/Form'
import Hidden from 'form/Hidden'
import MarkdownEditor from 'form/MarkdownEditor'

import './style/create-or-edit-article.scss'

const CreateOrEditArticle = (props) => {
	// inputProps fields
	const { fields: {id, title, content, published, publishDate } } = props;

	// states and dispatch functions etc
	const { handleSubmit, submitting, handleFormSubmit, handleContentChanged, authorId } = props;

	return(
		<Row>
			<Col>
				<Form className="add-article-form" formRef="addArticleForm" handleSubmit={handleSubmit} handleFormSubmit={handleFormSubmit} additionalFormSubmitParams={[authorId]}>
					<Hidden inputProps={id}/>
					<Row>
						<Col size={4}>
							<TextInput id="add-article-title" label="Title" inputProps={title}/>
						</Col>
					</Row>
                    <Row>
                        <Col size={3}>
                            <TextInput id="add-article-publish-date" label="Publish date" placeholder="DD.MM.YYYY" inputProps={publishDate} />
                        </Col>
                    </Row>
                    <Row>
                        <Col size={3}>
                            <CheckBox id="add-article-published" label="Published" inputProps={published} inputFieldClassName="published-input-field"/>
                        </Col>
                    </Row>
					<Row>
						<Col size={11}>
							<MarkdownEditor unparsedTextareaId="content" content="You can use **markdown** here..." onContentChange={handleContentChanged} />
						</Col>
					</Row>
					<Row>
						<Col>
							<SubmitButton/>
						</Col>
					</Row>
				</Form>
			</Col>
		</Row>
	)
}

const fields = [
	"id",
	"title",
	"content",
	"published",
	"publishDate"
]


export default reduxForm({
	form: 'article',
	fields
})(CreateOrEditArticle);
