import { useState } from "react";
import Dragdrop from "../../Drag drop/Dragdrop";
import "./updateJob.css";
import { useDispatch } from "react-redux";
import {createJob } from "../../redux/reducers/JobSlice.";
import toast from "react-hot-toast";

function UpdateJob() {
  const [formData, setFormData] = useState({
    companyName: "",
    field: "",
    location: "",
    aboutCompany: "",
    // companyLogo: "",
    position: "",

    jobType: "",

    link: "",
    salary: [],
    currency: "",
    jobDescription: "",
    jobRequirements: "",
    skills: "",
    isAvailable: false,
  });
  
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use formData object for further processing (e.g., sending to API)
    console.log(formData);
    const required = Object.keys(formData).every((key) => {
      if (formData[key] !== undefined && formData[key] !== "") {
        return true;
      } else {
        return false;
      }
    });
    required ? handleSuccess() : toast.error("fill all fields");
    // Reset form data after submission
  };
  const handleSuccess = () => {
    dispatch(createJob(formData));
    setFormData({
      companyName: "",
      field: "",
      location: "",
      aboutCompany: "",
      // companyLogo: "",
      position: "",

      jobType: "",

      link: "",
      salary: [],
      currency: "",
      jobDescription: "",
      jobRequirements: "",
      skills: "",
      isAvailable: false,
    });
    toast.success("successfully uploaded");
  };
  return (
    <div className="container home mt-5">
      <div className="details_job">
        <div className="d-flex justify-content-between align-items-center">
          <h2
            className="h2-title border-bottom border-warning pb-2"
            style={{ width: "fit-content" }}
          >
            Update Job Details
          </h2>
          <button
            className="btn ps-5 pe-5 pt-1 pb-1  text-light "
            style={{ background: "#bf9b30" }}
          >
            {" "}
            publish
          </button>
        </div>
        <div className="row align-items-center ">
          <div className="col-lg-7 col-md-12 ">
            <label className="label mb-2 " htmlFor="company_name">
              Update Company Name
            </label>
            <input
              type="text"
              style={{ height: "50px" }}
              id="companyName"
              className="input m-2 ms-0 mb-5"
              value={formData.companyName}
              onChange={handleInputChange}
            />

           
            <div className="row mt-5">
              <div className="col-md-6">
                <label className="label" htmlFor="filed">
                Update Field
                </label>
                <select
                  className="input2"
                  id="field"
                  value={formData.field}
                  onChange={handleInputChange}
                >
                  <option className="option" selected></option>
                  <option className="option" value="1">
                    1
                  </option>
                  <option className="option" value="2">
                    2
                  </option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="label" htmlFor="location">
                Update  Location
                </label>
                <select
                  className="input2"
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                >
                  <option className="option" selected></option>
                  <option className="option" value="1">
                    1
                  </option>
                  <option className="option" value="2">
                    2
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-md-12 p-0">
            <p className="text-light">Update Company Logo</p>
            <div className="">
              <Dragdrop />
            </div>
          </div>
        </div>
        <div>
          <label className="label" htmlFor="about-company">
          Update About The Company
          </label>
          <textarea
            name="aboutCompany"
            id="aboutCompany"
            rows={3}
            className="input"
            value={formData.aboutCompany}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="info info4">
          <div className="inp1 inp4">
            <label className="label" htmlFor="Position">
            Update Position
            </label>
            <input
              type="text"
              id="position"
              className="input2"
              value={formData.position}
              onChange={handleInputChange}
            />
          </div>
          <div className="inp1 inp4">
            <label className="label" htmlFor="jobtype">
            Update Job Type
            </label>
            <input
              type="text"
              id="jobType"
              className="input2"
              value={formData.jobType}
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex flex-row ms-2 gap-2 p-3 align-items-end">
          <div className="d-flex gap-2">
  <input
    type="radio"
    name="jobType"
    id="jobType"
    value="remote"
    checked={formData.jobType === "remote"}
    onChange={handleInputChange}
  />
  <label className="label" htmlFor="remote">
    Remote
  </label>
</div>
<div className="d-flex gap-2">
  <input
    type="radio"
    name="jobType"
    id="jobType"
    value="onSite"
    checked={formData.jobType === "onSite"}
    onChange={handleInputChange}
  />
  <label className="label" htmlFor="onsite">
    On site
  </label>
</div>

          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-md-4 p-0">
            <label className="label" htmlFor="salary">
            Update Salary
            </label>
            <input
              type="text"
              id="salary"
              className="input2"
              value={formData.salary}
              onChange={handleInputChange}
            />
          </div>
          <p
            className="text-light p-0 d-flex flex-row gap-2 align-items-center"
            style={{ transform: "translateY(25px)", width: "fit-content" }}
          >
            To
          </p>
          <div className="col-md-4">
            <label className="label" htmlFor="salary">
              currency
            </label>
            <select
              className="input2"
              id="currency"
              value={formData.currency}
              onChange={handleInputChange}
            >
              <option className="option" selected></option>
              <option className="option" value="1">
                1
              </option>
              <option className="option" value="2">
                2
              </option>
            </select>
          </div>
          <div className="col-md-3 p-0">
            <label className="label" htmlFor="link">
            Update link
            </label>
            <input
              type="text"
              id="link"
              className="input2"
              value={formData.link}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="job-description">
          Update Job Description
          </label>
          <textarea
            name="textarea"
            id="jobDescription"
            rows={3}
            className="input"
            value={formData.jobDescription}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label className="label" htmlFor="job-requirements">
          Update Job Requirements
          </label>
          <textarea
            name="textarea"
            id="jobRequirements"
            rows={3}
            className="input"
            value={formData.jobRequirements}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label className="label" htmlFor="skills">
          Update Skills
          </label>
          <input
            type="text"
            id="skills"
            className="input disabled skills"
            value={formData.skills}
            onChange={handleInputChange}
          />
        </div>
        <div className="d-flex p-3 flex-row gap-3 justify-content-end">
          <button
            id="update"
            className="btn  ps-4 pe-4 p-2 text-light fw-lg"
            style={{ background: "#bf9b30" }}
            type="submit"
            onClick={handleSubmit}
          >
            Update
          </button>
          <button
            id="reset"
            className="btn bg-secondary ps-4 pe-4 p-2 text-light fw-lg"
            onclick="resetresetValue()"
            type="reset"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateJob;
