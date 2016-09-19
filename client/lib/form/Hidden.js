import React, { Component } from 'react'

const Hidden = (props) => {
	return(
		<input type="text" {...props.inputProps} style={{display: "none"}}/>
	)
}

Hidden.propTypes = {
	inputProps: React.PropTypes.object,
}

Hidden.defaultProps = {
	inputProps: {}
}

export default Hidden