import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CvExperience() {
  const [adddiv, setadddiv] = useState(1);
  const [arr,setarr]=useState([])


  const [Organization, setOrganizationr] = useState("");
  const [Position, setPosition] = useState("");
  const [from, setfrom] = useState("");
  const [To, setTo] = useState("");
  const [Company, setCompany] = useState("");


  useEffect(() => {
    var arr2 = [];
    for (let i = 0; i < adddiv; i++) {
      arr2 = [
        ...arr2,
        
          <form className=" mt-4 cv-form row g-3 rounded cv-form-rounded">
            <div className="col-12   form-control-ct">
              <label for="company name" className="form-label">
                Organization name
              </label>
              <input
                type="text"
                className="form-control"
                id="companyName"
                onChange={(e)=>{setOrganizationr(e.target.value)}}
                values={Organization}
              />
            </div>
            <div className="col-12  form-control-ct">
              <label for="company position" className="form-label">
                Position
              </label>
              <input
                type="text"
                className="form-control"
                id="companyPosition"
                onChange={(e)=>{setPosition(e.target.value)}}
                values={Position}
              />
            </div>
            <div className="col-12 col-md-6 form-control-ct">
              <label for="from" className="form-label">
                from
              </label>
              <input
                type="text"
                className="form-control"
                id="companyFrom"
                onChange={(e)=>{setfrom(e.target.value)}}
                values={from}
              />
            </div>
            <div className="col-12 col-md-6 form-control-ct">
              <label for="to" className="form-label">
                To
              </label>
              <input
                type="text"
                className="form-control"
                id="companyTo"
                onChange={(e)=>{setTo(e.target.value)}}
                values={To}
              />
            </div>
            <div className="col-12 col-md-4 form-control-ct ">
              <label for="to" className="form-label">
                Company logo
              </label>
              <div className="experience-org-logo rounded"></div>
            </div>
            <div className="col-12 col-md-8  form-control-ct">
              <label for="description" className="form-label">
                company description
              </label>
              <textarea
                className="form-control order-last cv-summary-about"
                id="companyDescription"
                name="about"
                rows="5"
                onChange={(e)=>{setCompany(e.target.value)}}
                values={Company}
              ></textarea>
            </div>
          </form>
          
       
      ];
    }
    setarr(arr2);
  }, [adddiv]);

  const handleplusdiv = () => {
    const number = adddiv + 1;
    setadddiv(number);
  };
  const handleminussdiv = () => {
    const number = adddiv - 1;
    setadddiv(number);
  };

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
          <div className=" ctForAdd col-12 col-lg-6 p-0 px-lg-3">
            <div className="waay">
              <h5 className="mb-4 mb-lg-5">Experience</h5>
              {arr}
              <div className="icons-div ">
                <FontAwesomeIcon
                  onClick={handleminussdiv}
                  className="fa-regular fa-trash-can remove-icon remove-icon-move "
                  style={{ color: "#bf9b30" }}
                  icon={faTrashCan}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-6 icons-div">
                <FontAwesomeIcon
                  onClick={handleplusdiv}
                  type="button"
                  className="fa-solid fa-circle-plus add-icon add-icon-move"
                  style={{ color: "#bf9b30" }}
                  icon={faPlus}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 d-none d-lg-block cv-preview-section"></div>
        </div>
        <div className="container d-flex flex-column flex-md-row p-2 gap-4 text-capitalize pb-5 ">
          <Link
            to={"/cvskills'"}
            className="btn  btn-lg btn-width order-last order-lg-first "
            id="backBtn"
          >
            Back
          </Link>
          <Link
            to={"/cveducation"}
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
export default CvExperience;
