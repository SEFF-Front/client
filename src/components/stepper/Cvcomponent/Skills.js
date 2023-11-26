import React, { useEffect, useState } from "react";
import "../Style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

function Cvskills() {
    const [adddiv, setadddiv] = useState(3);
    const [arr,setarr]=useState([])
    const[skills,setskills]=useState("")
  
    useEffect(()=>{
      var arr2 = [];
    for (let i = 0; i < adddiv; i++) {
      arr2 = [
        ...arr2,
        <div className="skills-input-div">
        <div className="skills-input-formcontrol">
          <input
            type="text"
            className="form-control inputSkills"
            name="cvKey"
            id="inputSkills2"
            value=""
          />
        </div>
        <div className="skills-input-remove">
          <FontAwesomeIcon
          onClick={handleminussdiv}
            className="fa-regular fa-trash-can remove-icon"
            style={{ color: "#bf9b30" }}
            icon={faTrashCan}
            onChange={(e)=>{setskills(e.target.value)}}
            values={skills}

          />
        </div>
      </div>
,
      ];
    }
    setarr(arr2)
    },[adddiv])
    const handleplusdiv =() => {
        const number = adddiv + 1 
        setadddiv(number)
   }
  const handleminussdiv=()=>{
   const number = adddiv - 1 
   setadddiv(number)
  }
  return (
    <>
      <div className="body-overlay"></div>
      <div className="container-fluid col-12 navbar-container"></div>
      <div className="container-fluid col-12 logo-container"></div>
      <div className="container-fluid col-12 cv-section"></div>
      <div className="container-fluid col-12 cv-page-title"></div>
      <div className="container-fluid col-12 cv-page-supporting-text"></div>
      <div className="container-fluid col-12 stepper-section"></div>
      <section className=" CV-section p-3">
        <div className="container-fluid create-cv p-3 bg_black-opc my-4 mx-auto p-0 p-lg-4 rounded ">
          <div className="col-12 col-lg-6 p-0 px-lg-3">
            <form className="cv-form row g-3 " id="cvFormSkills">
              <h5 className="mb-4  text-capitalize">Skills</h5>

              <div className=" container-fluid skills-ct">
                <div className="row">
                  <div className="col-10">
                    <div className=" container  skills-input-ct">
                    {
              arr
              }

                     
                    </div>
                  </div>

                  <div className="col-2">
                    <div className="skills-input-add">
                      <FontAwesomeIcon onClick={handleplusdiv}
                        type="button"
                        className="fa-solid fa-circle-plus add-icon"
                        style={{ color: "#bf9b30" }}
                        icon={faPlus}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-12 col-lg-6 d-none d-lg-block cv-preview-section"></div>
        </div>
        <div className=" container d-flex flex-column flex-md-row p-2 gap-4 text-capitalize pb-5 ">
          <Link
            to={"/cvabout"}
            className="btn  btn-lg btn-width order-last order-lg-first "
            id="backBtn"
          >
            Back
          </Link>
          <Link
            to={"/experience"}
            className="btn  btn-lg btn-width"
            id="continueBtn"
            type="submit"
          >
            Continue
          </Link>
        </div>
      </section>

      <div className="container-fluid col-12 footer-section"></div>
    </>
  );
}
export default Cvskills;
