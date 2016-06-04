import React, { Component } from 'react'

const Modal = (props) => {
	const { id, agreeText, disagreeText, onAgreeClick } = props;
	return(
		<div id={id} className="modal">
		    <div className="modal-content">
		      {props.children}
		    </div>
		    <div className="modal-footer">
		      <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat" onClick={onAgreeClick}>{agreeText}</a>
		      <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">{disagreeText}</a>
		    </div>
		</div>
	)
}

Modal.propTypes = {
	id: React.PropTypes.string.isRequired,
	onAgreeClick: React.PropTypes.func.isRequired,
	agreeText: React.PropTypes.string,
	disagreeText: React.PropTypes.string
}

Modal.defaultProps = {
	agreeText: "Ok",
	disagreeText: "Cancel"
}

export default Modal;