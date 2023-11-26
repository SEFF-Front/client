import { faCirclePlus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addLinks } from "../../redux/reducers/cvDataSlice";

function Cvlinks() {
  const [adddiv, setadddiv] = useState(3);
  const [linksList, setLinksList] = useState([{ website: "", url: "" }]);
  const dispatch = useDispatch()
  const handlePlusDiv = () => {
    setadddiv(adddiv + 1);
    setLinksList([...linksList, { website: "", url: "" }]);
  };

  const handleMinusDiv = () => {
    if (adddiv > 0) {
      setadddiv(adddiv - 1);
      const updatedLinks = [...linksList];
      updatedLinks.pop();
      setLinksList(updatedLinks);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedLinks = linksList.map((link, idx) =>
    idx === index ? { ...link, [field]: value } : link
  );
  setLinksList(updatedLinks);
    const filteredLinks = linksList.filter(link => link.website.trim() !== "" && link.url.trim() !== "");
    dispatch(addLinks(filteredLinks));
  };

  useEffect(() => {
    // You can use linksList state to get the updated links data
    console.log("Updated Links List:", linksList);
  }, [linksList]);

  return (
    <>
      <section className="CV-section p-3 ">
        <div className="col-12 p-0 px-lg-3">
          <h5 className="mb-4 text-capitalize text-light">Links</h5>
          <form className="cv-form row g-3 cv-form-rounded pt-5" id="cv-form-rounded">
            <div className="container-fluid links-ct add-ct">
              <div className="row">
                <div className="col-12 text-light col-md-11">
                  <div className="container-fluid links-input-ct">
                    {linksList.map((link, index) => (
                      <div key={index} className="links-input-div row">
                        <div className="col-md-4">
                          <label htmlFor={`websiteName${index}`}>Website</label>
                          <input
                            type="text"
                            className="form-control websiteName"
                            name={`Website${index}`}
                            id={`websiteName${index}`}
                            value={link.website}
                            onChange={(e) =>
                              handleInputChange(index, "website", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-7">
                          <label htmlFor={`websiteUrl${index}`}>URL</label>
                          <input
                            type="url"
                            className="form-control websiteUrl"
                            name={`url${index}`}
                            id={`websiteUrl${index}`}
                            value={link.url}
                            onChange={(e) =>
                              handleInputChange(index, "url", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-1 links-input-remove remove-icon-to-margin">
                          <FontAwesomeIcon
                            onClick={handleMinusDiv}
                            className="mt-4 fa-regular fa-trash-can remove-icon remove-icon-move"
                            id="remove-icon-move"
                            style={{ color: "#bf9b30" }}
                            icon={faTrashCan}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-1 add-icon-ct links-input-add add-icon-to-margin">
                  <div className="links-input-add">
                    <FontAwesomeIcon
                      onClick={handlePlusDiv}
                      type="button"
                      className="fa-solid fa-circle-plus add-icon add-icon-move fs-4"
                      id="add-icon-move"
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

export default Cvlinks;
