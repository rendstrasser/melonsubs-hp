import React, { Component } from 'react'

import './style/main-header.scss'

const MainHeader = (props) => {
	return(
		<div className="main-header">
			{props.title}
		</div>
	)
}
export default MainHeader;