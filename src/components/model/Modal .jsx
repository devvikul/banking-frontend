import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children ,onSuccess, btnText}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">{children}</div>
        {onSuccess ? (
          <button className="modal-close-button proceedBtnColor" onClick={onSuccess}>
            {btnText}
          </button>
        ) : null}
        <button className="modal-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
    