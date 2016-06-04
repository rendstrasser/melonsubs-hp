import React, { Component } from 'react'
import { Link } from 'react-router'

import './style/nav-link.scss'

const NavLink = (props) => {
	return(
		<li className="bold">
			<Link to={"/" + props.to} activeClassName="nav-active" className="navigation-item waves-effect waves-light">
					 <i className="small material-icons nav-icon">{props.icon}</i>{props.children}
			</Link>
		</li>
	)
}

export default NavLink;