import React from 'react';
import { connect } from 'react-redux';
import './modal-window.css';
import PropTypes from 'prop-types';
import { modalWindowClose } from '../../actions';

const ModalWindow = ({ messageForModalWindow, modalWindowClose }) => (
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Внимание, товарищ !</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="false">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        { messageForModalWindow }
      </div>
      <div className="modal-footer">
        <button
          onClick={() => modalWindowClose()}
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
        >
Close
        </button>
      </div>
    </div>
  </div>
);

ModalWindow.propTypes = {
  messageForModalWindow: PropTypes.string.isRequired,
  modalWindowClose: PropTypes.func.isRequired,
};

const mapStateToProps = ({ messageForModalWindow }) => (
  { messageForModalWindow });

export default connect(mapStateToProps, { modalWindowClose })(ModalWindow);
