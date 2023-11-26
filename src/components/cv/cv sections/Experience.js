import { faCirclePlus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Dragdrop from "../../Drag drop/Dragdrop";
import {useDispatch} from "react-redux"
import { addExperience } from "../../redux/reducers/cvDataSlice";

function CvExperience() {
  const [adddiv, setAddDiv] = useState(1);
  const [experiences, setExperiences] = useState([]);
  const dispatch = useDispatch()
  const handleInputChange = (index, fieldName, value) => {
    const updatedExperiences = experiences.map((experience, idx) =>
      idx === index ? { ...experience, [fieldName]: value } : experience
    );
    setExperiences(updatedExperiences);
    dispatch(addExperience(experiences))
  };

  useEffect(() => {
    const initialExperience = {
      organization: '',
      position: '',
      from: '',
      to: '',
      company: ''
    };
    const initialExperiences = Array(adddiv).fill(initialExperience);
    setExperiences(initialExperiences);
  }, [adddiv]);

  const handleAddExperience = () => {
    setAddDiv(adddiv + 1);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = experiences.filter((exp, expIndex) => expIndex !== index);
    setExperiences(updatedExperiences);
    setAddDiv(adddiv - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use 'experiences' state variable which holds all the entered experience data.
    console.log('Submitted Experiences:', experiences);
  };

  return (
    <section className="CV-section p-3 ">
      <form onSubmit={handleSubmit}>
        <div className="ctForAdd col-12 text-light p-0 px-lg-3">
          <h5 className="mb-4 mb-lg-5">Experience</h5>
          {experiences.map((experience, index) => (
            <form className="mt-4 cv-form row g-3 rounded cv-form-rounded" key={index}>
              {/* Organization name */}
              <div className="col-12 form-control-ct">
                <label htmlFor={`organizationName${index}`} className="form-label">
                  Organization name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`organizationName${index}`}
                  value={experience.organization}
                  onChange={(e) => handleInputChange(index, 'organization', e.target.value)}
                />
              </div>
              <div className="col-12 form-control-ct">
                <label htmlFor={`organizationName${index}`} className="form-label">
                  position
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`organizationName${index}`}
                  value={experience.position}
                  onChange={(e) => handleInputChange(index, 'position', e.target.value)}
                />
              </div>
              <div className="col-xs-12 col-6 form-control-ct">
                <label htmlFor={`organizationName${index}`} className="form-label">
                  from
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`organizationName${index}`}
                  value={experience.from}
                  onChange={(e) => handleInputChange(index, 'from', e.target.value)}
                />
              </div>
              <div className="col-xs-12 col-6 form-control-ct">
                <label htmlFor={`organizationName${index}`} className="form-label">
                  to
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`organizationName${index}`}
                  value={experience.to}
                  onChange={(e) => handleInputChange(index, 'to', e.target.value)}
                />
              </div>
              {/* ... Other input fields ... */}
              <div className="col-12 col-md-4 form-control-ct">
                <label htmlFor={`companyLogo${index}`} className="form-label">
                  Company logo
                </label>
                <div className="experience-org-lgo rounded">
                  <Dragdrop size={'sm'} useFor={'company'} />
                </div>
              </div>
              <div className="col-12 col-md-8 form-control-ct">
                <label htmlFor={`companyDescription${index}`} className="form-label">
                  company description
                </label>
                <textarea
                  className="form-control order-last cv-summary-about"
                  id={`companyDescription${index}`}
                  name="about"
                  rows="5"
                  value={experience.company}
                  onChange={(e) => handleInputChange(index, 'company', e.target.value)}
                ></textarea>
              </div>
              {/* Remove button */}
              <div className="icons-div">
                <FontAwesomeIcon
                  onClick={() => handleRemoveExperience(index)}
                  className="fa-regular fa-trash-can remove-icon remove-icon-move"
                  style={{ color: "#bf9b30" }}
                  icon={faTrashCan}
                />
              </div>
            </form>
          ))}
          {/* Add button */}
          <div className="row">
            <div className="col-12 col-md-6 icons-div">
              <FontAwesomeIcon
                onClick={handleAddExperience}
                type="button"
                className="fa-solid fa-circle-plus add-icon add-icon-move"
                style={{ color: "#bf9b30" }}
                icon={faCirclePlus}
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default CvExperience;
