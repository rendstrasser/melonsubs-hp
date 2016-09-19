import React, { Component } from 'react'

const Articles = (props) => {
	return(
		<div className="articles">
			{props.children}
		</div>
	)
}

export default Articles