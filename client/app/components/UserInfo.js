import React, { Component } from 'react'
import { connect} from 'react-redux'

import { getMediaLink } from '../../lib/utils/media'

import './style/userinfo.scss'

const mapStateToProps = (state) => {
	return {
		user: state.base.user
	}
}

const UserInfo = ({ user: { name, profileImgPath } }) => {
	const completeProfileImgPath = getMediaLink(profileImgPath);
	return(
		<div className="user-info-outer">
			<div className="user-info">
				<div className="user-info-img"><img src={completeProfileImgPath}></img></div>
				<div className="user-info-name">{name}</div>
			</div>
		</div>
	)
}

export default connect(mapStateToProps)(UserInfo);