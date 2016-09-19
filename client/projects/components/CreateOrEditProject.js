import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import Row from 'core/Row'
import Col from 'core/Col'
import TextInput from 'form/TextInput'
import TextArea from 'form/TextArea'
import IconButton from 'core/IconButton'
import SelectInput from 'form/SelectInput'
import SubmitButton from 'form/SubmitButton'
import CheckBox from 'form/CheckBox'
import Form from 'form/Form'
import ImageUpload from 'form/ImageUpload'
import LabeledImageUpload from 'form/LabeledImageUpload'
import Hidden from 'form/Hidden'
import MultiMediaUpload from 'form/MultiMediaUpload'
import { noProjectCoverSrc, noProjectHeaderSrc, noProjectAvatarSrc, noProjectReleasePreviewSrc } from 'utils/media'

import './style/create-or-edit-project.scss'

const CreateOrEditProject = (props) => {
	// inputProps fields
	const { fields: {name, originalName, description, releaseDate, type, status, aniDbLink, aniSearchLink, malLink, studio, genres, homepage, published, id } } = props;

	// states and dispatch functions etc
	const { allowedProjectTypes, allowedProjectStatuses, handleSubmit, submitting, handleFormSubmit, initialCoverImgSrc, initialAvatarImgSrc, initialHeaderImgSrc, initialReleasePreviewImgSrc } = props;

	// allowed image settings
	const coverWidth = 250;
	const coverHeight = 363;
	const maxCoverFileSizeInKb = 150;

	const headerWidth = 865;
	const headerHeight = 420;
	const maxHeaderFileSizeInKb = 150;

	const avatarWidth = 50;
	const avatarHeight = 50;
	const maxAvatarFileSizeInKb = 150;

	const releasePreviewWidth = 443;
	const releasePreviewHeight = 180;
	const maxReleasePreviewFileSizeInKb = 150;

	return(
		<Row>
			<Col>
				<Form className="add-project-form" formRef="addProjectForm" handleSubmit={handleSubmit} handleFormSubmit={handleFormSubmit}>
					<Hidden inputProps={id}/>
					<Row>
						<ImageUpload name="cover" placeholder={noProjectCoverSrc()} previewImage={initialCoverImgSrc} 
							width={coverWidth} height={coverHeight} previewWidth={coverWidth} previewHeight={coverHeight}
							maxFileSizeInKb={maxCoverFileSizeInKb} cardStyle={{float: "left"}} />
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
								<Col size={4}>
									<SelectInput id="add-project-type" label="Type" inputProps={type} options={allowedProjectTypes}/>
								</Col>
								<Col size={4}>
									<SelectInput id="add-project-status" label="Status" inputProps={status} options={allowedProjectStatuses}/>
								</Col>
								<Col size={4}>
									<CheckBox id="add-project-published" label="Published" inputProps={published}/>
								</Col>
							</Row>
							<Row>
								<Col size={2}>
									<TextInput id="add-project-release-date" label="Release Date" placeholder="DD.MM.YYYY HH:mm" inputProps={releaseDate} />
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
							<Row style={{position: "relative", bottom: "0.2rem"}}>
								<Col>
									<LabeledImageUpload label="Avatar" name="avatar" placeholder={noProjectAvatarSrc()} previewImage={initialAvatarImgSrc}
										width={avatarWidth} height={avatarHeight} previewWidth={avatarWidth} previewHeight={avatarHeight}
										maxFileSizeInKb={maxAvatarFileSizeInKb} cardStyle={{float: "left", marginRight: "1rem"}} showInlineValidationError={false} />
									<IconButton disabled={true} icon="cloud_download" style={{marginTop: "0.45rem"}}>Scrape Information</IconButton>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col size={10}>
							<TextArea id="add-project-description" className="description" label="Description" inputProps={description}/>
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
							<LabeledImageUpload label="Header" name="header" placeholder={noProjectHeaderSrc()} previewImage={initialHeaderImgSrc}
								width={headerWidth} height={headerHeight} previewWidth={headerWidth} previewHeight={headerHeight}
								maxFileSizeInKb={maxHeaderFileSizeInKb} />
						</Col>
					</Row>
					<Row>
						<Col>
							<LabeledImageUpload label="Release-Preview" name="release-preview" placeholder={noProjectReleasePreviewSrc()} previewImage={initialReleasePreviewImgSrc}
								width={releasePreviewWidth} height={releasePreviewHeight} previewWidth={releasePreviewWidth} previewHeight={releasePreviewHeight}
								maxFileSizeInKb={maxReleasePreviewFileSizeInKb} cardStyle={{float: "left"}} />
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
	"published",
]

function mapStateToProps(state) {
	return {
		allowedProjectTypes: state.app.allowedProjectTypes,
		allowedProjectStatuses: state.app.allowedProjectStatuses,
	}
}

export default reduxForm({
	form: 'project',
	fields
}, mapStateToProps)(CreateOrEditProject);
