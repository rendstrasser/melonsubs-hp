import React, { Component } from 'react'

import Sidebar from './Sidebar'
import Main from './Main'
import UnfocusPageOverlay from 'core/UnfocusPageOverlay'

import 'materialize-css/sass/materialize.scss'
import 'materialize-css/dist/js/materialize.js'

const App = (props) => {
	return(
		<div className="page">
			<UnfocusPageOverlay />
			<Sidebar location={props.location}/>
			<Main title={props.routes[props.routes.length-1].title}>{props.children}</Main>
		</div>
	)
}

export default App