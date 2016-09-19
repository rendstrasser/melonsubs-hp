import React, { Component } from 'react'

const Col = (props) => {
	const size = Math.max(1, Math.min(12, props.size));

	return(
		<div className={"col s" + size} style={props.style}>
			{ props.children }
		</div>
	)
}

Col.propTypes = {
	size: React.PropTypes.number,
	style: React.PropTypes.object,
}

Col.defaultProps = {
	size: 12,
	style: {}
}

export default Col;