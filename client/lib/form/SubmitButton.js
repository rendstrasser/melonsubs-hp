import React, { Component } from 'react'

const SubmitButton = (props) => {
	return(
		<button className="btn waves-effect waves-light" type="submit" name="action">Submit
	    	<i className="material-icons right">send</i>
	  	</button>
	)
}

SubmitButton.propTypes = {
	disabled: React.PropTypes.bool
}

SubmitButton.defaultProps = {
	disabled: false
}

export default SubmitButton;