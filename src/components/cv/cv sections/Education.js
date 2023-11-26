import { faCirclePlus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addEducation } from "../../redux/reducers/cvDataSlice";

function Cveducation() {
  const [adddiv, setadddiv] = useState(1);
  const [educationList, setEducationList] = useState([
    {
      Organization: "",
      Degree: "",
      From: "",
      To: "",
      Descrpition: "",
    },
  ]);
  const dispatch = useDispatch();
  
  const handlePlusDiv = () => {
    setadddiv(adddiv + 1);
    setEducationList([
      ...educationList,
      {
        Organization: "",
        Degree: "",
        From: "",
        To: "",
        Descrpition: "",
      },
    ]);
  };

  const handleMinusDiv = () => {
    if (adddiv > 1) {
      setadddiv(adddiv - 1);
      const updatedEducationList = [...educationList];
      updatedEducationList.pop();
      setEducationList(educationList);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedEducationList = educationList.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    setEducationList(updatedEducationList);
    dispatch(addEducation(updatedEducationList));
  };


  useEffect(() => {
    var arr2 = [];
    for (let i = 0; i < adddiv; i++) {
      arr2.push(
        <form key={i} className="mt-4 cv-form row g-3 rounded cv-form-rounded">
          {/* Your form fields */}
          <div className="col-12 form-control-ct">
            <label htmlFor={`companyName${i}`}>Organization name</label>
            <input
              type="text"
              className="form-control"
              id={`companyName${i}`}
              value={educationList[i].Organization}
              onChange={(e) =>
                handleInputChange(i, "Organization", e.target.value)
              }
            />
          </div>
          <div className="col-12 form-control-ct">
            <label htmlFor={`companyName${i}`}>Degree</label>
            <input
              type="text"
              className="form-control"
              id={`position${i}`}
              value={educationList[i].Degree}
              onChange={(e) =>
                handleInputChange(i, "Degree", e.target.value)
              }
            />
          </div>
          <div className="col-xs-12 col-md-6 form-control-ct">
            <label htmlFor={`companyName${i}`}>From</label>
            <input
              type="text"
              className="form-control"
              id={`position${i}`}
              value={educationList[i].From}
              onChange={(e) =>
                handleInputChange(i, "From", e.target.value)
              }
            />
          </div>
          <div className="col-xs-12 col-md-6 form-control-ct">
            <label htmlFor={`companyName${i}`}>To</label>
            <input
              type="text"
              className="form-control"
              id={`position${i}`}
              value={educationList[i].To}
              onChange={(e) =>
                handleInputChange(i, "To", e.target.value)
              }
            />
          </div>
          <div className="col-12 form-control-ct">
            <label htmlFor={`companyName${i}`}>Descrpition</label>
            <input
              type="text"
              className="form-control"
              id={`position${i}`}
              value={educationList[i].Descrpition}
              onChange={(e) =>
                handleInputChange(i, "Descrpition", e.target.value)
              }
            />
          </div>
          {/* Other input fields similarly */}
        </form>
      );
    }
    setArr(arr2);
  }, [adddiv, educationList]);
  const [arr, setArr] = useState([]);

  return (
    <>
      <section className="CV-section p-3 ">
        <div className="ctForAdd col-12 text-light p-0 px-lg-3">
          <div className="waay">
            <h5 className="mb-4 mb-lg-5">Education</h5>
            {arr.map((form) => form)}
            <div className="icons-div">
              <FontAwesomeIcon
                onClick={handleMinusDiv}
                className="fa-regular fa-trash-can remove-icon remove-icn-move"
                style={{ color: "#bf9b30" }}
                icon={faTrashCan}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 icons-div">
              <FontAwesomeIcon
                onClick={handlePlusDiv}
                type="button"
                className="fa-solid fa-circle-plus add-icon add-icon-move"
                style={{ color: "#bf9b30" }}
                icon={faCirclePlus}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cveducation;
