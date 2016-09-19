import React, { Component } from 'react'

class Form extends Component {

	constructor() {
	    super();

	    this.handleSubmit = this.handleSubmit.bind(this);
  	}

  	handleSubmit(data) {
  		const { handleFormSubmit, formRef, additionalFormSubmitParams } = this.props;

		// handles real form submit (handleSubmit only handles redux-form submit)
  		handleFormSubmit(this.refs[formRef], ...additionalFormSubmitParams);
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
	formRef: React.PropTypes.string.isRequired,
	additionalFormSubmitParamSuppliers : React.PropTypes.arrayOf(React.PropTypes.func)
}

Form.defaultProps = {
	className: "",
    additionalFormSubmitParams: []
}

export default Form;