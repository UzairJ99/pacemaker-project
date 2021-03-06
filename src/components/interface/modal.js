import React from 'react';
import ReactDOM from 'react-dom';
import EgramPanel from './EgramPanel';

const Modal = ({ isShowing, hide, values }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal" style={{paddingTop: '0'}}>
        <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <p>
          <EgramPanel values = {values} />
        </p>
      </div>
    </div>
  </React.Fragment>, document.getElementById("modal-root")
) : null;

export default Modal;