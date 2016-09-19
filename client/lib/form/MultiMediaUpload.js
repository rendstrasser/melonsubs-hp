import React, { Component } from 'react'
import { connect } from 'react-redux'

import IconButton from 'core/IconButton'
import Popup from 'core/Popup'
import MultiMediaUploadView from './MultiMediaUploadView'

import { showMultiMediaUploadPopupClicked } from './actions'

class MultiMediaUpload extends Component {

	constructor() {
		super();

		this.buildMediaUploadStateKey = this.buildMediaUploadStateKey.bind(this);
		this.handleOnMediaUploadClick = this.handleOnMediaUploadClick.bind(this);
	}

	buildMediaUploadStateKey() {
		const { name } = this.props;
		return `multi-media-upload-${name}`;
	}

	handleOnMediaUploadClick() {
		const { showPopupClicked, name } = this.props;
		showPopupClicked(Popup.buildShowKey(`popup-${name}`));
	}

	render() {
		const { mediaUploadState, previewText, name } = this.props;

		const mediaFiles = mediaUploadState[this.buildMediaUploadStateKey()]; // expecting array of files here

		// TODO: generate thumbnails????
		// TODO: associate main and secondary label with video? - new table

		return(
			<div>
				<Popup id={"popup-" + name}>
					<MultiMediaUploadView />
				</Popup>
				<IconButton icon="file_upload" onClick={this.handleOnMediaUploadClick}>{previewText}</IconButton>
			</div>
		)
	}	
} 

MultiMediaUpload.propTypes = {
	name: React.PropTypes.string.isRequired,
	previewText: React.PropTypes.string.isRequired,
	allowedFileTypes: React.PropTypes.arrayOf(React.PropTypes.string),
}

MultiMediaUpload.defaultProps = {
	allowedFileTypes: ["image/png", "image/jpeg"]
}

const mapStateToProps = (state) => {
	return {
		mediaUploadState: state.app.basicRouteSpecificState.mediaUpload,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		showPopupClicked: ((componentName) => dispatch(showMultiMediaUploadPopupClicked(componentName)))	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiMediaUpload)
