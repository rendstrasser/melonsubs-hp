import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { addProjectCoverImgChanged, addProjectCoverImgValidationError, addProjectSubmitted } from '../redux/actions.js'

import Row from './Row'
import Col from './Col'
import TextInput from './TextInput'
import TextArea from './TextArea'
import IconButton from './IconButton'
import SelectInput from './SelectInput'
import SubmitButton from './SubmitButton'
import CheckBox from './CheckBox'
import Form from './Form'
import ImageUpload from './ImageUpload'
import Hidden from './Hidden'
import { noProjectCoverSrc } from '../scripts/utils'

import '../style/create-or-edit-project.scss'

const CreateOrEditProject = (props) => {
	// inputProps fields
	const { fields: {name, originalName, description, releaseDate, type, status, aniDbLink, aniSearchLink, malLink, studio, genres, homepage, published, id } } = props;

	// states and dispatch functions etc
	const { coverImgValidationError, allowedProjectTypes, allowedProjectStatuses, handleSubmit, 
		currentCoverImgSrc, onCoverImgChanged, onCoverImgValidationError, submitting, handleFormSubmit, initialCoverImgSrc } = props;

	const ValidationError = coverImgValidationError !== undefined ? <div className="card-content cover-validation-error"><span className="validation-error">{coverImgValidationError}</span></div> : "";

	const coverWidth = 170;
	const coverHeight = 240;

	const coverCardStyle = {
		float: "left",
		width: coverWidth + "px"
	}

	let coverPreviewImage = currentCoverImgSrc;
	if (!coverPreviewImage) {
		coverPreviewImage = initialCoverImgSrc;
	}

	return(
		<Row>
			<Col>
				<Form className="add-project-form" formRef="addProjectForm" handleSubmit={handleSubmit} handleFormSubmit={handleFormSubmit}>
					<Hidden inputProps={id}/>
					<Row>
						<div className="card" style={coverCardStyle}>
							<div className="card-image">
								<ImageUpload name="cover" placeholder={noProjectCoverSrc()} onValidationSuccess={onCoverImgChanged} previewImage={coverPreviewImage} 
									onValidationError={onCoverImgValidationError} width={coverWidth} height={coverHeight} previewWidth={coverWidth} previewHeight={coverHeight}
									maxFileSizeInKb={400} />
							</div>
							{ValidationError}
						</div>
						<Col size={9}>
							<Row>
								<Col size={3}>
									<TextInput id="add-project-anime-name" label="Anime name" inputProps={name}/>
								</Col>
								<Col size={3}>
									<TextInput id="add-project-original-anime-name" label="Original anime name" inputProps={originalName}/>
								</Col>
							</Row>
							<Row>
								<Col>
									<IconButton disabled={true} icon="cloud_download">Scrape Information</IconButton>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col>
							<TextArea id="add-project-description" className="description" label="Description" inputProps={description}/>
						</Col>
					</Row>
					<Row>
						<Col size={3}>
							<SelectInput id="add-project-type" label="Type" inputProps={type} options={allowedProjectTypes}/>
						</Col>
						<Col size={3}>
							<SelectInput id="add-project-status" label="Status" inputProps={status} options={allowedProjectStatuses}/>
						</Col>
						<Col size={3}>
							<CheckBox id="add-project-published" label="Published" inputProps={published}/>
						</Col>
					</Row>
					<Row>
						<Col size={2}>
							<TextInput id="add-project-release-date" label="Release Date" placeholder="DD.MM.YYYY" inputProps={releaseDate} />
						</Col>
						<Col size={3}>
							<TextInput id="add-project-genre" label="Genre" inputProps={genres} />
						</Col>
						<Col size={3}>
							<TextInput id="add-project-studio" label="Studio" inputProps={studio} />
						</Col>
						<Col size={3}>
							<TextInput id="add-project-homepage" label="Homepage" inputProps={homepage} />
						</Col>
					</Row>
					<Row>
						<Col size={7}>
							<TextInput id="add-project-anidb-link" label="AniDb-Link" inputProps={aniDbLink} />
						</Col>
					</Row>
					<Row>
						<Col size={7}>
							<TextInput id="add-project-anisearch-link" label="aniSearch-Link" inputProps={aniSearchLink} />
						</Col>
					</Row>
					<Row>
						<Col size={7}>
							<TextInput id="add-project-mal-link" label="MyAnimeList-Link" inputProps={malLink} />
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
	"name",
	"originalName",
	"description",
	"releaseDate",
	"type",
	"status",
	"aniDbLink",
	"aniSearchLink",
	"malLink",
	"studio",
	"genres",
	"homepage",
	"published"
]

function mapStateToProps(state) {
	return {
		allowedProjectTypes: state.base.allowedProjectTypes,
		allowedProjectStatuses: state.base.allowedProjectStatuses,
		currentCoverImgSrc: state.base.currentAddProjectCoverImg,
		coverImgValidationError : state.base.currentAddProjectCoverImgValidationError
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onCoverImgChanged: (image => dispatch(addProjectCoverImgChanged(image))),
		onCoverImgValidationError: (text => dispatch(addProjectCoverImgValidationError(text)))
	}
}

export default reduxForm({
	form: 'project',
	fields
}, mapStateToProps, mapDispatchToProps)(CreateOrEditProject);
