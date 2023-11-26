import React, { useState } from "react";

import "./Add_Certificate_Details.css";
import Dragdrop from "../../Drag drop/Dragdrop";
import { useDispatch } from "react-redux";
import { addCertificate } from "../../redux/reducers/certificateSlice";
import toast from "react-hot-toast";

const AddCertificateDetails = () => {

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    studentname: "",
    date_acquired: "",
    upload_date: "",
    course: "",
    uploadedFile:null,
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleFileDrop = (droppedFile) => {
    setFormData({ ...formData, uploadedFile: droppedFile });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const required = Object.keys(formData).every(key => {
      if (formData[key] !== undefined && formData[key] !== '') {
        return true;
      }else{
        return false
      }
    })
    required?handleSuccess():toast.error("fill all fields");

    
    
    // You can use 'formData' to send it to the server or perform other operations.
  };
  const handleSuccess =()=>{
    dispatch(addCertificate(formData));
    setFormData({
      studentname: "",
      date_acquired: "",
      upload_date: "",
      course: "",
    });
    toast.success('successfully uploaded')
  }
  return (
    <>
      <div className="left-box"></div>
    <div className="home">
     <div className="overlay">

        <div className="container-info ">
            <h2 className="h2-title">Add Certificate Details</h2>
            <span className="row3"></span>
            <form className="details" >
                <div className="info ">
                    <div className="inp1 bg-transparent ">
                        <label className="label" for="studentname">Student Name</label>
                        <select className="input co" id="studentname" 
                        onChange={handleInputChange}
                        value={formData.studentname}>
                            <option className="option"selected></option>
                            <option className="option" value="1">Ahmed Abusta</option>
                            <option className="option" value="2">ALi Mohamed</option>
                          </select>   
                    </div>

                    <div className="inp1 bg-transparent">
                        <label className="label" for="date_acquired">Date Acquired</label>
                        <input className="input" type="date" id=" date_acquired"
                        onChange={handleInputChange}
                        value={formData.date_acquired}/>                                 
                    </div>
                    <div className="inp1 bg-transparent">
                        <label className="label" for="upload_date">Upload Date</label>
                        <input className="input" type="time" id="upload_date"
                        onChange={handleInputChange}
                        value={formData.upload_date}/>                          
                    </div>
                </div>            
                <div className="info_course ">
                    <div className="inp1 bg-transparent"> 
                        <label className="label" for="course">Course Title</label>
                          <select id=" course" className="co input2" 
                          onChange={handleInputChange}
                          value={formData.course}>
                            <option className="option"selected></option>
                            <option className="option" value="1">Front End Development</option>
                            <option className="option" value="2">Back End Development</option>
                          </select>
                    </div>
                </div>
            </form>
        </div>   
        <div className=" ">
            <h2 className="title text-light    "  >Upload File</h2>
            <Dragdrop onFileDrop={handleFileDrop}/>
            <div className="d-flex justify-content-end gap-3 mt-3 text-light">
            <button id="reset" className=" btn bg-secondary text-light ps-4 pe-4 p-2 " onclick="resetresetValue()" type="reset">CANCEL</button>
                    <button className="  btn bg-warning text-light ps-4 pe-4 p-2" type="submit">UPLOAD</button>
            </div>
     </div>
    </div>
    </div>
    </>
  )
    
};
export default AddCertificateDetails;
