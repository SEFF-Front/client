import React, { useEffect, useState } from "react";
import "../Style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux"
import { addSkills } from "../../redux/reducers/cvDataSlice";

function Cvskills() {
  const [adddiv, setadddiv] = useState(3);
  const [skillsList, setSkillsList] = useState(Array.from({ length: 3 }, () => ""));

  const handlePlusDiv = () => {
    setadddiv(adddiv + 1);
    setSkillsList([...skillsList, ""]);
  };

  const handleMinusDiv = () => {
    if (adddiv > 0) {
      setadddiv(adddiv - 1);
      const updatedSkills = [...skillsList];
      updatedSkills.pop();
      setSkillsList(updatedSkills);
    }
  };
  const dispatch = useDispatch();
  const handleInputChange = (index, value) => {
    const updatedSkills = [...skillsList];
    updatedSkills[index] = value;
    setSkillsList(updatedSkills);
    dispatch(addSkills(skillsList))
  };

  useEffect(() => {
    // You can use skillsList state to get the updated skills data
    console.log("Updated Skills List:", skillsList);
  }, [skillsList]);

  return (
    <>
      <section className="CV-section p-3 ">
        <div className="col-12 text-light p-0 px-lg-3">
          <form className="cv-form row g-3 " id="cvFormSkills">
            <h5 className="mb-4 text-capitalize">Skills</h5>

            <div className="container-fluid skills-ct cv-form-rounded">
              <div className="row">
                <div className="col-10">
                  <div className="container skills-input-ct">
                    {skillsList.map((skill, index) => (
                      <div key={index} className="skills-input-div">
                        <div className="skills-input-formcontrol">
                          <input
                            type="text"
                            className="form-control inputSkills"
                            name={`cvKey${index}`}
                            value={skill}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                          />
                        </div>
                        <div className="skills-input-remove">
                          <FontAwesomeIcon
                            onClick={handleMinusDiv}
                            className="fa-regular fa-trash-can remove-icon"
                            style={{ color: "#bf9b30" }}
                            icon={faTrashCan}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-2">
                  <div className="skills-input-add">
                    <FontAwesomeIcon
                      onClick={handlePlusDiv}
                      type="button"
                      className="fa-solid fa-circle-plus add-icon"
                      style={{ color: "#bf9b30" }}
                      icon={faCirclePlus}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Cvskills;
