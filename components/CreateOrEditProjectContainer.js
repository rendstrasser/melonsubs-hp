import React, { Component } from 'react'
import { connect } from 'react-redux'

import CreateOrEditProject from './CreateOrEditProject.js'

import { getMediaLink, normalizeEmptyFormValue, noProjectCoverSrc } from '../scripts/utils'
import { projectCreationFormSubmitted, projectUpdateFormSubmitted } from '../redux/actions.js'

function getProjectById(id, projects) {
	if (!id) {
  		return undefined;
  	}

  	const project = projects.find((project) => project.id == id);
  	if (!project) {
  		return undefined;
  	}

  	return project
}

const CreateOrEditProjectContainer = (props) => {
	const { id } = props.params;
	const { handleSubmitForCreate, handleSubmitForUpdate } = props;

	const inputProps = {}
	const project = getProjectById(id, props.projects);

	inputProps.handleFormSubmit = handleSubmitForCreate;

	if (project) {
		inputProps.initialValues = {
			id: project.id,
	  		name: normalizeEmptyFormValue(project.name),
	  		originalName: normalizeEmptyFormValue(project.originalName),
	  		description: normalizeEmptyFormValue(project.description),
	  		releaseDate: normalizeEmptyFormValue(project.releaseDate),
	  		genres: normalizeEmptyFormValue(project.genres),
	  		studio: normalizeEmptyFormValue(project.studio),
	  		homepage: normalizeEmptyFormValue(project.homepage),
	  		aniDbLink: normalizeEmptyFormValue(project.aniDbLink),
	  		aniSearchLink: normalizeEmptyFormValue(project.aniSearchLink),
	  		malLink: normalizeEmptyFormValue(project.malLink),
	  		type: normalizeEmptyFormValue(project.type),
	  		status: normalizeEmptyFormValue(project.status),
	  		published: normalizeEmptyFormValue(project.published),
  		}

  		inputProps.initialCoverImgSrc = getMediaLink(project.coverImgPath, noProjectCoverSrc());
  		inputProps.handleFormSubmit = handleSubmitForUpdate;
	}

	return(
		<CreateOrEditProject {...inputProps} />
	)
}

const mapStateToProps = (state) => {
	return {
		projects: state.base.projects
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleSubmitForCreate:  ((htmlFormElem) => dispatch(projectCreationFormSubmitted(htmlFormElem))),
		handleSubmitForUpdate:  ((htmlFormElem) => dispatch(projectUpdateFormSubmitted(htmlFormElem)))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditProjectContainer);

