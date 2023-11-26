import React, { useState } from "react";
import "../Style.css";
import { Link } from "react-router-dom";
import Dragdrop from "../../Drag drop/Dragdrop";
import Footer from "../../footer/Footer";
import {useDispatch} from "react-redux"
import { addMainData } from "../../redux/reducers/cvDataSlice";
function Maininfo() {
  const dispatch =useDispatch()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    profession: "",
    country: "",
    city: "",
    mobileNumber: "",
    state: "",
    birthday: "",
    email: ""
});
  
const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    console.log(formData)
    dispatch(addMainData(formData))
};




  return (
    <>
      <section className=" CV-section p-3 cv-form-rounded">
          <div className="col-12  text-light  p-0 px-lg-3">
            <form className="cv-form row g-3">
              <div className="col-12 col-md-6  form-control-ct">
                <label for="inputFirstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
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

                  value={formData.lastName}
                  onChange={handleChange}
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
                  value={formData.profession}
                  onChange={handleChange}

                  

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
                  value={formData.country}
                  onChange={handleChange}
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
                  value={formData.city}
                  onChange={handleChange}
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
                  value={formData.mobileNumber}
                  onChange={handleChange}
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
                  value={formData.state}
                  onChange={handleChange}
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
                  value={formData.birthday}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 ">
                <Dragdrop useFor={'personal'}/>
              </div>
            </form>
          </div>


      </section>
    </>
  );
}
export default Maininfo;
