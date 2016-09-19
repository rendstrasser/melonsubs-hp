import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { browserHistory } from 'react-router'

import Row from 'core/Row';
import Col from 'core/Col'
import TextInput from 'form/TextInput'
import PasswordInput from 'form/PasswordInput'
import SubmitButton from 'form/SubmitButton'
import Form from 'form/Form'

import './style/login.scss'

import { loginSubmitted } from '../actions.js'

class Login extends Component {

	componentWillReceiveProps(nextProps) {
		if (nextProps.user !== undefined) {
			browserHistory.push("/");
		}
	}

	render() {
		const { fields: { email, password } } = this.props;
		const { handleSubmit, handleSubmitToSaga } = this.props;

		return(
			<div id="login-form-container">
				<Form className="login-form" formRef="loginForm" handleSubmit={handleSubmit} handleFormSubmit={handleSubmitToSaga}>
					<span id="login-text" style={{margin: "10px", fontSize: "0.9rem"}}>
						Please login to access other pages.
					</span>
					<Row>
						<Col>
							<TextInput id="login-email-address" label="E-Mail" inputProps={email}/>
						</Col>
					</Row>
					<Row>
						<Col>
							<PasswordInput id="login-email-password" label="Password" inputProps={password} />
						</Col>
					</Row>
					<Row>
						<Col>
							<SubmitButton />
						</Col>
					</Row>
				</Form>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		handleSubmitToSaga: ((htmlFormElem) => dispatch(loginSubmitted(htmlFormElem)))	
	}
}

function mapStateToProps(state) {
	return { 
		user: state.app.user, 
		loginError: state.app.logInError 
	}
}

const fields = [
	"email",
	"password"
];

export default reduxForm({
	form: 'login',
	fields
}, mapStateToProps, mapDispatchToProps)(Login);