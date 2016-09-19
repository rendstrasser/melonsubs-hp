import React, { Component } from 'react'

const Row = (props) => {
	return(
		<div className={"row " + props.rowClassName} style={ props.style }>
			{ props.children }
		</div>
	)
}

Row.propTypes = {
	style: React.PropTypes.object,
	rowClassName: React.PropTypes.string
}

Row.defaultProps = {
	style: {},
	rowClassName: ""
}

export default Row;