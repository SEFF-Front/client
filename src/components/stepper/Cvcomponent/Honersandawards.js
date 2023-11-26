import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Honersandawards() {
  const [adddiv, setadddiv] = useState(1);
  const [arr, setarr] = useState([]);
  const [Award, setAward] = useState("");
  const [Awardyear, setAwardyear] = useState("");
  const [AwardDescriptio, setAwardDescriptio] = useState("");

  useEffect(() => {
    var arr2 = [];
    for (let i = 0; i < adddiv; i++) {
      arr2 = [
        ...arr2,
        <form className="cv-form row g-3">
          <h5 className="mb-4 mb-lg-5">Honers And Awards</h5>
          <div className="col-8   form-control-ct">
            <label for="award name" className="form-label">
              Award name
            </label>
            <input
              type="text"
              className="form-control awardName"
              id="awardName"
              onChange={(e)=>{setAward(e.target.value)}}
            values={Award}
            />
          </div>

          <div className="col-4  form-control-ct">
            <label for="award-year" className="form-label">
              Award year
            </label>
            <input
              type="text"
              className="form-control awardYear"
              id="awardYear"
              onChange={(e)=>{setAwardyear(e.target.value)}}
            values={Awardyear}
            />
          </div>

          <div className="col-12  form-control-ct">
            <label for="award description" className="form-label">
              Award Description
            </label>
            <textarea
              className="form-control cv-summary-about awardDescription"
              id="awardDescription"
              name="about"
              rows="5"
              onChange={(e)=>{setAwardDescriptio(e.target.value)}}
              values={AwardDescriptio}
            ></textarea>
          </div>
        </form>,
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
            <div className=" waay">
              {arr}

              <div className="icons-div">
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
            to={"/cveducation"}
            className="btn  btn-lg btn-width order-last order-lg-first "
            id="backBtn"
          >
            Back
          </Link>
          <Link
            to={"/hobbiesandinterests"}
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
export default Honersandawards;
