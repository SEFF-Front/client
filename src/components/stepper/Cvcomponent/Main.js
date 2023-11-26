import React, { useState } from "react";
import "../Style.css";
import { Link } from "react-router-dom";

function Maininfo() {
    const [firstname,setfirstname]=useState("")
    const [Lastname,setLastname]=useState("")
    const [Profession,setProfession]=useState("")
    const [Country,setCountry]=useState("")
    const [City,setCity]=useState("")
    const [Mobilenumber,setMobilenumber]=useState("")
    const [State,setState]=useState("")
    const [Birthday,setBirthday]=useState("")
    const [Email,setEmail]=useState("")
  return (
    <>
      {/* <div className="body-overlay"></div>
      <div className="container-fluid col-12 navbar-container"></div>
      <div className="container-fluid col-12 logo-container"></div>
      <div className="container-fluid col-12 cv-section"></div>
      <div className="container-fluid col-12 cv-page-title"></div>
      <div className="container-fluid col-12 cv-page-supporting-text"></div>
      <div className="container-fluid col-12 stepper-section"></div> */}
      <section className=" CV-section p-3">
        <div className="container-fluid create-cv p-3 bg_black-opc my-4 mx-auto p-0 p-lg-4 rounded ">
          <div className="col-12 col-lg-6 p-0 px-lg-3">
            <form className="cv-form row g-3">
              <div className="col-12 col-md-6  form-control-ct">
                <label for="inputFirstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={firstname}
                  onChange={(e)=>{setfirstname(e.target.value)}}
                />
              </div>

              <div className="col-12 col-md-6 form-control-ct">
                <label for="inputLastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"

                  value={Lastname}
                  onChange={(e)=>{setLastname(e.target.value)}}
                />
              </div>

              <div className="col-12 col-md-6 form-control-ct">
                <label for="inputProfession" className="form-label">
                  Profession
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="profession"
                  value={Profession}
                  onChange={(e)=>{setProfession(e.target.value)}}

                  

                />
              </div>

              <div className="col-12 col-md-6 form-control-ct">
                <label for="inputCountry" className="form-label">
                  Country
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  value={Country}
                  onChange={(e)=>{setCountry(e.target.value)}}
                />
              </div>

              <div className="col-12 col-md-4 form-control-ct">
                <label for="inputCity" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={City}
                  onChange={(e)=>{setCity(e.target.value)}}
                />
              </div>

              <div className="col-12 col-md-8 form-control-ct">
                <label for="inputMobileNumber" className="form-label">
                  Mobile Number
                </label>
                <input
                  className="form-control "
                  id="mobileNumber"
                  placeholder="+20 "
                  type="tel"
                  value={Mobilenumber}
                  onChange={(e)=>{setMobilenumber(e.target.value)}}
                />
              </div>

              <div className="col-12 col-md-6 form-control-ct">
                <label for="inputCity" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  value={State}
                  onChange={(e)=>{setState(e.target.value)}}
                />
              </div>

              <div className="col-12 col-md-6 form-control-ct">
                <label for="inputCity" className="form-label">
                  Birthday
                </label>
                <input
                  type="date"
                  className="form-control custom-date-input"
                  id="birthday"
                  value={Birthday}
                  onChange={(e)=>{setBirthday(e.target.value)}}
                />
              </div>

              <div className="col-12 form-control-ct">
                <label for="inputCVEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={Email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                />
              </div>

              <div className="col-12 upload-personal-photo"></div>
            </form>
          </div>
          <div className="col-12 col-lg-6 d-none d-lg-block cv-preview-section"></div>

          <div className="container d-flex flex-column flex-md-row p-2 gap-4 text-capitalize pb-5 ">
            <Link
              to={"/createcv"}
              className="btn  btn-lg btn-width order-last order-lg-first "
              disabled=""
              id="backBtn"
            >
              Back
            </Link>
            <Link
              to={"/cvabout"}
              className="btn  btn-lg btn-width"
              id="continueBtn"
              type="submit"
            >
              Continue
            </Link>
          </div>
        </div>
      </section>
      <div className="container-fluid col-12 footer-section"></div>
    </>
  );
}
export default Maininfo;
