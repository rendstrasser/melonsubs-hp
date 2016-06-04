import React, { Component } from 'react'

import NavLink from './NavLink'
import Header from './Header'
import UserInfo from './UserInfo'

import './style/sidebar.scss'

const Sidebar = (props) => {
	return(
		<ul className="side-nav fixed navigation z-depth-5">
			<Header/>
			<UserInfo/>
			<NavLink to="home" icon="home">Home</NavLink>
			<NavLink to="projects" icon="dashboard">Projects</NavLink>
			<NavLink to="articles" icon="message">Articles</NavLink>
			<NavLink to="members" icon="person">Members</NavLink>
			<NavLink to="settings" icon="settings">Settings</NavLink>
		</ul>
	)
}

export default Sidebar;