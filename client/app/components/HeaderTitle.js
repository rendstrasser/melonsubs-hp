import React, { Component } from 'react'

import './style/header-title.scss'

const HeaderTitle = ({ title }) => {
	return(
		<span className="headerTitle">
			{ title }
		</span>
	)
}

export default HeaderTitle;