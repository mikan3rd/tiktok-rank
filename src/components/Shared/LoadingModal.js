import React from 'react';
import Modal from 'react-modal';
import {ProgressCircular} from 'react-onsenui';

const LoadingModal = (props) => {
    const {isLoading} = props;
    const customStyles = {
      content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        border: 'none',
      },
      overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: '100',
      },
    };

    return (
      <Modal
        isOpen={isLoading}
        style={customStyles}
      >
        <ProgressCircular
          indeterminate
          style={{width: '80px', height: '80px'}}
        />
      </Modal>
    );
  };

export default LoadingModal;
