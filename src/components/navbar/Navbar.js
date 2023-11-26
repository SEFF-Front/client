import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assest/seff_logo_transparent.png"
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.min.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/reducers/userSlice.";
// import 'bootstrap/dist/js/bootstrap.min.js';
// import 'bootstrap/dist/umd/popper.min.js';

import Api from "../../utils/Api"
const Navbar = () => {
  const [nav, setNav] = useState(false)
  const handleNav = () => {
    setNav(!nav)
  }
  /************ Server *****************/
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const Logout = async () => {
    await Api.post('/auth/logout').then(() => {
      navigate("/profile");
    })
  }
  /************ Server *****************/
  return (
    <>
      <ul className="navbar-nav bg-dark text-light p-1 flex-wrap  ps-3 pe-3 d-flex justify-content-end position-relative gap-3 flex-row ms-auto" style={{ zIndex: '5' }}>
        {
          !isAuthenticated && <li className="nav-item p-0">
            <Link className="nav-link  p-0" to="/login"  >LOGIN</Link>
          </li>
        }

        {
          isAuthenticated && user.role == 'Admin' && <li className="nav-item  p-0">
            <Link to='/adminPanel/users' className="nav-link  p-0">ADMIN PANEL</Link>
          </li>

        }
        {isAuthenticated && user.role == 'Student' && <li className="nav-item  p-0">
          <Link to='/StudentPanel' className="nav-link  p-0">STUDENT PANEL</Link>
        </li>
        }
        {isAuthenticated && user.role == 'instructor' && <li className="nav-item  p-0">
          <Link to='/instructorPanel' className="nav-link  p-0">INSTRUCTOR PANEL</Link>
        </li>
        }
        {
          isAuthenticated && user.role == 'Student' && <li className="nav-item  p-0">
            <Link className="nav-link  p-0" to="/createCv">CREATE CV</Link>
          </li>
        }
        {
          isAuthenticated && <li className="nav-item  p-0">
            <Link className="nav-link  p-0" to="/profile">PROFILE</Link>
          </li>
        }
        {
          isAuthenticated && <li className="nav-item  p-0">
            <Link className="nav-link  p-0" to="/" onClick={Logout} >LOGOUT</Link>
          </li>
        }


      </ul>
      <div className="container-md navbar-component mb-3 ">
        <nav className="navbar navbar-expand-md ">
          <div className={nav ? " container container-fluid " : "container"}>
            <Link to="/">
              <img src={logo} className="navbar-brand d-block " alt="..." /></Link>

            <button className="navbar-toggler" onClick={handleNav} type="button" >
              <FontAwesomeIcon icon={faBars} className="icon-navbar " />
            </button>
            <div className={nav ? "collapse navbar-collapse show bg-black p-3" : "collapse navbar-collapse"} id="navbarSupportedContent">
              <ul className="navbar-nav lh-base justify-content-center d-flex align-items-center  mb-lg-0 mt-3">
                <li className="nav-item">
                  <Link className="nav-link" to="/">HOME</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">ABOUT</Link>
                </li>
                <li class="nav-item dropdown">
                  <Link class="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    TECH
                  </Link>
                  <ul class="dropdown-menu">
                    <li><Link className="dropdown-item" to="/">Action</Link></li>
                    <li><Link className="dropdown-item" to="/">Another action</Link></li>

                    <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ms-2" to="/business">BUSINESS</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ms-2" to="/security">SECURITY</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ms-2" to="/sports">SPORTS</Link>
                </li> <li className="nav-item">
                  <Link className="nav-link ms-2" to="/medical">MEDICAL</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ms-2" to="/startups">STARTUPS</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ms-2" to="/apps">APPS</Link>
                </li>
                {
                  isAuthenticated && <li className="nav-item">
                    <Link className="nav-link ms-2" to="/jobs">JOBS</Link>
                  </li>
                }
                <li className="nav-item rounded ms-2 py-2 nav-con">
                  <Link className="nav-contact" to="/contactus">CONTACT US</Link>
                </li>
              </ul>

            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
export default Navbar;