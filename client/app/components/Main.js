import React, { Component } from 'react'

import MainHeader from './MainHeader.js'
import MainContent from './MainContent.js'

import './style/main.scss'

const Main = (props) => {
	return(
		<div className="main">
			<MainHeader title={props.title}/>
			<MainContent>{props.children}</MainContent>
		</div>
	)
}

export default Main;