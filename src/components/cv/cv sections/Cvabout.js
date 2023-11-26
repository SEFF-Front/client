import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Style.css";
import {useDispatch} from "react-redux"
import { addAboutData } from "../../redux/reducers/cvDataSlice";

function Cvabout() {
  const[about,setAbout]=useState("")
  const dispatch = useDispatch()
  const handleAboutChange = (e) => {
    const text = e.target.value;
    setAbout(text); // Update local state
    dispatch(addAboutData(about)); // Dispatch action to update Redux state
  };  return (
    <>
      <section className=" CV-section p-3 ">
          <div className="col-12  p-0 px-lg-3">
            <form className="cv-form row g-3">
              <div className="col-12 text-light">
                <label for="inputAbout" className="form-label">
                  About
                </label>
                <div className="cv-form-rounded">
                <textarea
                  className="form-control col-12 w-100 cv-summary-about"
                  id="inputAbout"
                  name="about"
                  rows="5"
                  value={about}
                  onChange={handleAboutChange}
                ></textarea>
                </div>
              </div>
            </form>
          </div>
      </section>

    </>
  );
}
export default Cvabout;
