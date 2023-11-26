import { useDispatch } from "react-redux";
import { faCirclePlus, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { addAwards } from "../../redux/reducers/cvDataSlice";

function HonorsAndAwards() {
  const [awardsList, setAwardsList] = useState([
    {
      awardName: "",
      awardYear: "",
      awardDescription: "",
    },
  ]);
  const dispatch = useDispatch();

  const handleInputChange = (e, index, field) => {
    const updatedAwardsList = awardsList.map((item, idx) =>
      idx === index ? { ...item, [field]: e.target.value } : item
    );
    setAwardsList(updatedAwardsList);
    dispatch(addAwards(awardsList))
  };

  const handleAddAwards = () => {
    setAwardsList([
      ...awardsList,
      {
        awardName: "",
        awardYear: "",
        awardDescription: "",
      },
    ]);
  };

  const handleRemoveAwards = (index) => {
    const updatedAwardsList = awardsList.filter((_, i) => i !== index);
    setAwardsList(updatedAwardsList);
  };

  const renderAwards = awardsList.map((award, index) => (
    <form className="cv-form row g-3 mt-1" key={index}>
      
      <div className="row cv-form-rounded">
      <div className="col-8 form-control-ct">
        <label htmlFor={`awardName${index}`} className="form-label">
          Award name
        </label>
        <input
          type="text"
          className="form-control awardName"
          id={`awardName${index}`}
          onChange={(e) => handleInputChange(e, index, "awardName")}
          value={award.awardName}
        />
      </div>
      <div className="col-4 form-control-ct">
        <label htmlFor={`awardName${index}`} className="form-label">
          Award year
        </label>
        <input
          type="text"
          className="form-control awardName"
          id={`awardName${index}`}
          onChange={(e) => handleInputChange(e, index, "awardYear")}
          value={award.awardYear}
        />
      </div>
      <div className="col-12 form-control-ct">
        <label htmlFor={`awardName${index}`} className="form-label">
          Award description
        </label>
        <input
          type="text"
          className="form-control awardName"
          id={`awardName${index}`}
          onChange={(e) => handleInputChange(e, index, "awardDescription")}
          value={award.awardDescription}
        />
      </div>
      {/* ... Other input fields similarly */}

      <div className="icons-div">
        <FontAwesomeIcon
          onClick={() => handleRemoveAwards(index)}
          className="fa-regular fa-trash-alt remove-icon remove-icon-move"
          style={{ color: "#bf9b30", cursor: "pointer" }}
          icon={faTrashAlt}
        />
      </div>
      </div>
    </form>
  ));

  // Return JSX
  return (
    <>
      <section className="CV-section p-3">
        <div className="col-12 text-light p-0 px-lg-3">
        <h5 className="mb-4 mb-lg-5">Honors And Awards</h5>
          {renderAwards}
          <div className="row">
            <div className="col-12 col-md-6 icons-div">
              <FontAwesomeIcon
                onClick={handleAddAwards}
                type="button"
                className="fa-solid fa-circle-plus add-icon add-icon-move"
                style={{ color: "#bf9b30", cursor: "pointer" }}
                icon={faCirclePlus}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HonorsAndAwards;
