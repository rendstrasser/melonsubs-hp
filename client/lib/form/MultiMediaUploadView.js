import React, { Component } from 'react'

import TextInput from './TextInput'
import ImageUpload from './ImageUpload'
import Col from 'core/Col'
import Row from 'core/Row'

import { noMultiMediaImageSrc } from 'utils/media'

const MultiMediaUploadView = (props) => {

	const previewWidth = 480;
	const previewHeight = 320;
	const maxCoverFileSizeInKb = 1000;

	return(
		<div>
			<Row>
				<Col size={6}>
					<Row>
						<span className="text-big">
							Manage additional media files
						</span>
					</Row>
					<Row>
						<TextInput id="add-project-multi-media-object-primary-label" label="Primary label" />
					</Row>
					<Row>
						<TextInput id="add-project-multi-media-object-secondary-label" label="Secondary label" />
					</Row>
					<Row>
						<TextInput id="add-project-multi-media-object-description" label="Description" />
					</Row>
				</Col>
				<Col size={6}>
					<Row>
						<ImageUpload name="current-media" placeholder={noMultiMediaImageSrc()} 
								width={previewWidth} height={previewHeight} previewWidth={previewWidth} previewHeight={previewHeight}
								maxFileSizeInKb={maxCoverFileSizeInKb} cardStyle={{float: "right"}} />
					</Row>
					<Row>
						<span className="text-small">
							Click on the preview image to upload a new medium. 
							All resolutions are allowed. The size limit is 1MB.
							The file types png, jpg and mkv are allowed. 
						</span>
					</Row>
				</Col>
			</Row>
		</div>
	)
}

MultiMediaUploadView.propTypes = {
}

MultiMediaUploadView.defaultProps = {
}

export default MultiMediaUploadView;