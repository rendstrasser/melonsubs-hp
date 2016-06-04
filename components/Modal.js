import React, { Component } from 'react'

const Modal = (props) => {
	const { id, agreeText, disagreeText, onAgreeClick, className } = props;
	return(
		<div id={id} className={"modal " + className}>
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
	className: React.PropTypes.string,
	onAgreeClick: React.PropTypes.func.isRequired,
	agreeText: React.PropTypes.string,
	disagreeText: React.PropTypes.string
}

Modal.defaultProps = {
	agreeText: "Ok",
	className: "",
	disagreeText: "Cancel"
}

export default Modal;