  import { useState } from 'react';
  import './customUi.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  function ConfirmationPopup({ onClose }) {
    const [showAlert, setShowAlert] = useState(false);
  
    const handleOkClick = () => {
      onClose();
      setShowAlert(false);
    };
  
    return (
      <div className="popup-overlay">
        {showAlert && <div className="alert">Please fill all fields!</div>}
        <h5 className="poptitle">Please fill all fields</h5>
        <button onClick={onClose} className="popclose">
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <button className="nav-link p-0 text-light" onClick={() => setShowAlert(true)}>
          Ok
        </button>
        {showAlert && (
          <div className="alert-dialog">
            <p>Are you sure you want to proceed without filling all fields?</p>
            <button onClick={handleOkClick}>Yes</button>
            <button onClick={() => setShowAlert(false)}>No</button>
          </div>
        )}
      </div>
    );
  }

export default ConfirmationPopup;