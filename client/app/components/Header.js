import React, { Component } from 'react'
import { connect} from 'react-redux'

import HeaderTitle from './HeaderTitle.js'

import './style/header.scss'

const mapStateToProps = (state) => {
	return {
		title: state.base.title
	}
}

const Header = ({ title }) => {
	return(
		<div className="header">
			<HeaderTitle title={title} />
		</div>
	)
}

export default connect(mapStateToProps)(Header);