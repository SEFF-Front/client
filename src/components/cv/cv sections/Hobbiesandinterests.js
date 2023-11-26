import { faCircle, faCirclePlus, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addHobbies } from "../../redux/reducers/cvDataSlice";

function HobbiesAndInterests() {
  const [adddiv, setAdddiv] = useState(3);
  const [hobbiesList, setHobbiesList] = useState(Array(3).fill(""));
  const dispatch = useDispatch();

  const handleHobbiesChange = (e, index) => {
    const updatedHobbiesList = [...hobbiesList];
    updatedHobbiesList[index] = e.target.value;
    setHobbiesList(updatedHobbiesList);
    const inputValues = hobbiesList.slice(0, adddiv);
    dispatch(addHobbies(inputValues.filter(hobby => hobby.trim() !== "")));
  };

  const handleAddHobbies = () => {
    setAdddiv(adddiv + 1);
    setHobbiesList([...hobbiesList, ""]);
  };

  const handleRemoveHobbies = (index) => {
    const updatedHobbiesList = hobbiesList.filter((_, i) => i !== index);
    setHobbiesList(updatedHobbiesList);
    setAdddiv(adddiv - 1);
  };



  return (
    <>
      <section className="CV-section p-3 ">
        <div className="col-12 text-light p-0 px-lg-3">
          <form className="cv-form row g-3">
            <h5 className="mb-4 text-capitalize">Hobbies And Interests</h5>

            <div className="container-fluid hobbies-ct cv-form-rounded">
              
              <div className="row">
                
                <div className="col-10">
                  <div className="container hobbies-input-ct" id="hobbiesInputCt">
                    {hobbiesList.map((value, index) => (
                      <div className="hobbies-input-div" key={index}>
                        <div className="hobbies-input-formcontrol">
                          <input
                            type="text"
                            className="form-control inputHobbies"
                            onChange={(e) => handleHobbiesChange(e, index)}
                            value={value}
                          />
                        </div>

                        <div className="hobbies-input-remove">
                          <FontAwesomeIcon
                            onClick={() => handleRemoveHobbies(index)}
                            className="fa-regular fa-trash-alt remove-icon"
                            style={{ color: "#bf9b30", cursor: "pointer" }}
                            icon={faTrashAlt}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="col-2 fs-4">
                  <div className="hobbies-input-add">
                    <FontAwesomeIcon
                      type="button"
                      onClick={handleAddHobbies}
                      className="fa-solid fa-circle-plus add-icon "
                      style={{ color: "#bf9b30", cursor: "pointer"}}
                      icon={faCirclePlus}
                    />
                  </div>
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

export default HobbiesAndInterests;
