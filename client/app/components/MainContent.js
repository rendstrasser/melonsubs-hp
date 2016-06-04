import React, { Component } from 'react'

import './style/main-content.scss'

const MainContet = (props) => {
	return(
		<div className="main-content">
			{props.children}
		</div>
	)
}

export default MainContet;