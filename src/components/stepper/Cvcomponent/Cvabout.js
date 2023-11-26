import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "../Style.css";

function Cvabout() {
  const[about,setabout]=useState("")
 
  return (
    <>
      {/* <div className="body-overlay"></div>
      <div className="container-fluid col-12 navbar-container"></div>
      <div className="container-fluid col-12 logo-container"></div>
      <div className="container-fluid col-12 cv-section"></div>
      <div className="container-fluid col-12 cv-page-title"></div>
      <div className="container-fluid col-12 cv-page-supporting-text"></div>
      <div className="container-fluid col-12 stepper-section"></div> */}
      {/* <section className=" CV-section p-3">
        <div className="container-fluid create-cv p-3 bg_black-opc my-4 mx-auto p-0 p-lg-4 rounded "> */}
          <div className="col-12 col-lg-6 p-0 px-lg-3">
            <form className="cv-form row g-3">
              <div className="col-12">
                <label for="inputAbout" className="form-label">
                  About
                </label>
                <textarea
                  className="form-control cv-summary-about"
                  id="inputAbout"
                  name="about"
                  rows="5"
                  value={about}
                  onChange={(e)=>{setabout(e.target.value)}}
                ></textarea>
              </div>
            </form>
          </div>
          <div className="col-12 col-lg-6 d-none d-lg-block cv-preview-section"></div>
        {/* </div>
    </section> */}
    </>
  );
}
export default Cvabout;
