import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Row from 'core/Row'
import Col from 'core/Col'
import Modal from 'core/Modal'
import FloatingButton from 'core/FloatingButton'
import { getMediaLink, noProjectCoverSrc } from 'utils/media'
import { deleteProjectTriggered } from '../actions'

import './style/project-overview.scss'

var deleteId = undefined;
function showDeleteDialog(event, currentId) {
	// prevent event bubbling to Link component onClick listener
	event.preventDefault();
	deleteId = currentId;
}

function renderModalTrigger(elem) {
	$(elem).leanModal();
}

function deleteProject(handleDeleteProjectTriggered) {
	handleDeleteProjectTriggered(deleteId);
}

const ProjectsOverview = (props) => {
	const { projects, handleDeleteProjectTriggered } = props; 
	return(
		<div>
			<Modal id="delete-modal" className="delete-modal" onAgreeClick={() => deleteProject(handleDeleteProjectTriggered)}>
				<div className="delete-modal-title">Delete project?</div>
			    <div className="delete-modal-content">Do you really want to delete this project? Once it's deleted there is no possibility to bring it back.</div>
			</Modal>
			<Row>
				<Col>
					{projects.sort((a, b) => a.id - b.id).map((project) => {
						const coverImgSrc = project.coverImgPath ? getMediaLink(project.coverImgPath) : noProjectCoverSrc();
						const name = project.name ? project.name : "";
						const releaseYear = project.releaseDate ? project.releaseDate.substring(project.releaseDate.length-4, project.releaseDate.length) : "";

						return(
							<div key={project.id} className="project-tile">
								<Row rowClassName="project-tile-row">
									<Col>
										<div className="project-tile-img-container">
											<img width="170" height="240" className="project-tile-img" src={coverImgSrc} />
											<Link to={"/projects/set/" + project.id} className="project-tile-img-overlay">
												<button className="deleteButton modal-trigger" data-target="delete-modal" onClick={(event) => showDeleteDialog(event, project.id)} ref={renderModalTrigger}>
													<i className="small material-icons">delete</i> 
												</button> 
											</Link>
										</div>
									</Col>
								</Row>
								<Row rowClassName="project-tile-row">
									<Col>
										<span className="project-tile-name">
											{name}
										</span>
									</Col>
								</Row>
								<Row rowClassName="project-tile-row project-tile-year-row">
									<Col>
										<span className="project-tile-year">
											{releaseYear}
										</span>
									</Col>
								</Row>
							</div>
						)
					})}
				</Col>
			</Row>
			<FloatingButton to="/projects/set" parentClassName="addButton">+</FloatingButton>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		projects: state.projects.elements	
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleDeleteProjectTriggered: ((projectId) => dispatch(deleteProjectTriggered(projectId)))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsOverview);