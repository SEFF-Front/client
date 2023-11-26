import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cvlinks() {
  const [adddiv, setadddiv] = useState(3);
  const [arr, setarr] = useState([]);
  const [Website, setWebsite] = useState("");
  const [url, seturl] = useState("");

  useEffect(() => {
    var arr2 = [];
    for (let i = 0; i < adddiv; i++) {
      arr2 = [
        ...arr2,
        <div class="row">
          <div class=" col-12 col-md-4 ">
            <label for="website name">Website</label>
            <input
              type="text"
              class="form-control websiteName"
              name="Website"
              id="websiteName3"
              onChange={(e)=>{setWebsite(e.target.value)}}
              values={Website}
            />
          </div>
          <div class="col-12 col-md-7">
            <label for="website url">url </label>
            <input
              type="url"
              class="form-control websiteUrl"
              name="url"
              id="websitUrl3"
              onChange={(e)=>{seturl(e.target.value)}}
              values={url}
            />
          </div>
          <div class=" col-12 col-md-1  links-input-remove remove-icon-to-margin">
          <FontAwesomeIcon onClick={handleminussdiv}
              className=" mt-4 fa-regular fa-trash-can remove-icon remove-icon-move " 
              style={{color:"#bf9b30"}} icon={faTrashCan} />
          </div>
        </div>,
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
          <div className="col-12 col-lg-6 p-0 px-lg-3">
            <h5 className="mb-4  text-capitalize">Links</h5>
            <form class="cv-form row g-3 ">
              <div class=" container-fluid links-ct add-ct">
                <div class="row">
                  <div class="col-12 col-md-11">
                    <div class=" container-fluid  links-input-ct">
                      <div class="links-input-div">
                        <div class=" container-fluid links-input-formcontrol"></div>
                        {arr}
                      </div>
                    </div>
                  </div>

                  <div class="col-1 add-icon-ct links-input-add add-icon-to-margin">
                    <div class="links-input-add ">

                    <FontAwesomeIcon onClick={handleplusdiv} type="button" 
              className="fa-solid fa-circle-plus add-icon add-icon-move" 
              style={{color:"#bf9b30"}} 
              icon={faPlus} />

                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-12 col-lg-6 d-none d-lg-block cv-preview-section"></div>
        </div>
        <div className=" container d-flex-column d-md-flex justify-content-between p-2 gap-4 text-capitalize pb-5 links-btn-ct">
          <Link
            to={"/hobbiesandinterests"}
            className="btn btn-gray  btn-lg btn-width order-first links-backBtn "
            id="backBtn"
          >
            Back
          </Link>
          <button
            className="btn  btn-lg btn-width order-last links-downloadBtn"
            id="downloadBtn"
            type="submit"
          >
            Download
          </button>
        </div>
      </section>
    </>
  );
}
export default Cvlinks;
