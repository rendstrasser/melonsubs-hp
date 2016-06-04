import React, { Component } from 'react'

class Form extends Component {

	constructor() {
	    super();

	    this.handleSubmit = this.handleSubmit.bind(this);
  	}

  	handleSubmit(data) {
  		const { handleFormSubmit, formRef } = this.props;

  		handleFormSubmit(this.refs[formRef]);
  	}

	render() {
		const { className, formRef, handleSubmit } = this.props;

		return(
			<form className={className} onSubmit={handleSubmit(this.handleSubmit)} ref={formRef}>
				{ this.props.children }
			</form>
		)
	}
}

Form.propTypes = {
	handleSubmit: React.PropTypes.func.isRequired,
	handleFormSubmit: React.PropTypes.func.isRequired,
	className: React.PropTypes.string,
	formRef: React.PropTypes.string.isRequired
}

Form.defaultProps = {
	className: ""
}

export default Form;