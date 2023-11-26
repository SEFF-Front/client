import React from 'react';
import './customUi.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CustomUi(props) {
  const navigate=useNavigate()
  function handlelogin(){
    // window.location.href = '/login';
    navigate('/login')
  }
  return (
    <div className="popup-overlay">
      <h5 className='poptitle'>Please login to view this page</h5>
      <button onClick={props.onClose} className='popclose'>
      <FontAwesomeIcon icon={faXmark} />
      </button>
      <button className="nav-link  p-0 text-light"
        onClick={()=>{props.onClose();handlelogin()}}
      >
        Login
      </button>
      {/* <a className="nav-link p-0 text-light text-center"  href="/login">
            LOGIN
          </a> */}
    </div>
  );
}


export default CustomUi;