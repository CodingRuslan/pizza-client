import React from 'react';
import './modal-window.css';

const ModalWindow = () => (
  <div className="modal-dialog hidden" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="false">&times;</span>
        </button>
      </div>
      <div className="modal-body">
            ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
);

export default ModalWindow;
