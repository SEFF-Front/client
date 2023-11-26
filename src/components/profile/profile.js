import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faEnvelope,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "../redux/reducers/userSlice.";
import { toast } from "react-toastify";

export default function Profile() {
  const { user, isAuthenticated } = useSelector((state) => state.user);


  var [editMode, setEditMode] = useState(false);
  var [age, setAge] = useState("26yo");
  var [nationality, setNationality] = useState("Sudanese");
  var [country, setCountry] = useState("Egypt");
  var [city, setCity] = useState("Cairo");
  var [score, setScore] = useState(97);
  var [university, setUniversity] = useState(
    "International Islamic University"
  );
  var [major, setMajor] = useState("Computer Science");
  var [graduation, setGraduation] = useState(2019);
  var [email, setEmail] = useState("balqeessaber@gmail.com");
  var [mobile, setMobile] = useState("0020 1064569047");
  
  var [about, setAbout] = useState(
    "At Vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores"
  );
  var [newData, setNewData] = useState([]);
  // function imageUpload() {
  //   imageInput.current.click();
  // }
  // function imageDisplay(e) {
  //   let file = e.target.files[0];
  //   setImage(file);
  // }
  const handleClick = (e) => {
    e.preventDefault()
    setEditMode(!editMode);
    if (editMode) {
      var x = [
        image,
        age,
        nationality,
        country,
        city,
        score,
        university,
        major,
        graduation,
        email,
        mobile,
        about,
      ];
      setNewData(x);
    }
  };
  const [image, setImage] = useState(null);
  const imageInput = useRef();
  const [userProfileImage, setUserProfileImage] = useState(
    user?.profileImage
      ? `http://localhost:4000/seff-academy/uploads/${user.profileImage}`
      : null
  );
  
  function imageUpload() {
    imageInput.current.click();
  }
  
  function imageDisplay(e) {
    let file = e.target.files[0];
    setImage(file);
    setUserProfileImage(URL.createObjectURL(file));
  }
  const { register, handleSubmit } = useForm();
  const initialProfileData ={
    username:(user?.firstName+' '+ user?.lastName)||null,
    userInfo:`${user?.major ?? ''}${user?.major && user?.university ? ', ' : ''}${user?.university ?? ''}`,
    userId:user?.userId,
    age: user?.age || null,
    nationality: user?.nationality || null,
    country: user?.country || null,
    city: user?.city || null,
    score: user?.score || 0,
    university: user?.university || null,
    major: user?.major || null,
    graduation: user?.graduationYear || null,
    email: user?.email || null,
    mobile: user?.mobileNumber || null,
     about: user?.about || null,
  }
const  dispatch =  useDispatch()
  const onSubmit = (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== undefined)
    );
    if (image) {
      filteredData.image = image;
    }
    if (Object.keys(filteredData).length === 0) {
      toast.warn("No data to submit.");
      return; 
    }
    setEditMode(!editMode);
    dispatch(updateUserProfile(filteredData))
      .unwrap()
      .then(() => {
        toast.success("Profile Updated");
      })
      .catch((backendError) => {
        toast.error(backendError.error);
      });
  }
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1"
      />
      <form className="profilebody pt-5"  onSubmit={handleSubmit(onSubmit)} >
        <div class="profileoverlay"></div>
        <div class="resume1 position-relative">
          <div class="row gx-0 p-5 gy-3">
            <span className="col-sm-1 col-md-1 position-relative">
    <img
      src={userProfileImage || ""}
      className="rounded-circle bg-white"
      alt=""
      width="100"
      height="100"
    />
    <span className={editMode ? "pen" : "none"} onClick={imageUpload}>
      <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#bf9b30" }} />
    </span>
    <input
      onChange={imageDisplay}
      type="file"
      accept="image/*"
      ref={imageInput}
      // {...register("profileImage")}
      style={{ display: "none" }}
    />
  </span>
            <span class="col-sm-12 ps-3 col-md-11">
              <h5 class="text-white"style={{textTransform:"capitalize"}} >{initialProfileData.username}</h5>
              <span class="text-white">
{initialProfileData.userInfo}
              </span>
            </span>
            <button
              class=" btn text-white  text-uppercase edit"
              style={{ top: "25px !important",display: "flex", justifyContent: "end"}}
              type={editMode ? "submit" : "button"}
              onClick={editMode? null: handleClick} 
            >
                {editMode ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </div>
        <div
          className="profiledata mt-5 position-relative"
          style={{ background: "none" }}
        >
          <div class="row gy-2 gx-5 gy-md-0 p-5">
            <div class="col-sm-12 col-md-3 profilefirst">
              <div>
                <h4>Personal Info</h4>
                <p class="text-white inputlabel">Student ID</p>
                
                <span class="text-white ms-3">{initialProfileData.userId}</span>
                <p class="text-white inputlabel">Age</p>
                <input
                  type="number"
                //   id="Age"
                //   name="Age"
                  defaultValue={initialProfileData.age}
                  {...register("age")}
                //   onChange={(e) => setAge(e.target.value)}
                  class={editMode ? " profileinput" : " profileinput disabled"}
                  disabled={!editMode}
                />
                <p class="text-white inputlabel">Nationality</p>
                <input
                  type="text"
                  id="Nationality"
                  name="Nationality"
                  defaultValue={initialProfileData.nationality}
                //   onChange={(e) => setNationality(e.target.value)}
                {...register("nationality")}
                  class={editMode ? " profileinput" : " profileinput disabled"}
                  disabled={!editMode}
                />
                <p class="text-white inputlabel">Country</p>
                <input
                  type="text"
                  id="Country"
                  name="Country"
                  defaultValue={initialProfileData.country}
                //   onChange={(e) => setCountry(e.target.value)}
                {...register("country")}
                  class={editMode ? " profileinput" : " profileinput disabled"}
                  disabled={!editMode}
                />
                <p class="text-white inputlabel">City</p>
                <input
                  type="text"
                  id="City"
                  name="City"
                  defaultValue={initialProfileData.city}
                //   onChange={(e) => setCity(e.target.value)}
                {...register("city")}
                  class={editMode ? " profileinput" : " profileinput disabled"}
                  disabled={!editMode}
                />
                <p class="text-white inputlabel">Score</p>
                <input
                  type="text"
                  id="Score"
                  name="Score"
                  defaultValue={initialProfileData.score}
                //   onChange={(e) => setScore(e.target.value)}
              
                  class=" profileinput disabled"
                  disabled
                />
                <h4>Education</h4>
                <p class="text-white inputlabel2">University</p>
                <input
                  type="text"
                  id="University"
                  name="University"
                  defaultValue={initialProfileData.university}
                  {...register("university")}
                //   onChange={(e) => setUniversity(e.target.value)}
                  class={editMode ? " profileinput" : " profileinput2 disabled"}
                  disabled={!editMode}
                />
                <p class="text-white inputlabel2">Major</p>
                <input
                  type="text"
                  id="Major"
                  name="Major"
                  defaultValue={initialProfileData.major}
                //   onChange={(e) => setMajor(e.target.value)}
                {...register("major")}
                  class={
                    editMode ? " profileinput2" : " profileinput2 disabled"
                  }
                  disabled={!editMode}
                />
                <p class="text-white inputlabel2">Graduation Year</p>
                <input
                  type="number"
                  id="Graduation Year"
                  name="Graduation Year"
                  defaultValue={initialProfileData.graduation}
                //   onChange={(e) => setGraduation(e.target.value)}
                {...register("graduationYear")}
                  class={
                    editMode ? " profileinput2" : " profileinput2 disabled"
                  }
                  disabled={!editMode}
                />
                <h4>Contact Info</h4>
                {/* <FontAwesomeIcon
                  icon={faEnvelope}
                  className="profileemail"
                  style={{ color: "#bf9b30" }}
                />
                <p class="text-white inputlabel">Email</p>
                <input
                  type="text"
                  id="Email"
                  name="Email"
                  defaultValue={initialProfileData.email}
                  onChange={(e) => setEmail(e.target.value)}
                  class={
                    editMode ? " profileinput2" : " profileinput2 disabled"
                  }
                  disabled={!editMode}
                /> */}
                <FontAwesomeIcon
                  icon={faPhoneVolume}
                  className="profileemail"
                  style={{ color: "#bf9b30" }}
                />
                <p class="text-white inputlabel">Mobile Number</p>
                <input
                  type="number"
                  id="Mobil Number"
                  name="Mobil Number"
                  defaultValue={initialProfileData.mobile}
                //   onChange={(e) => setMobile(e.target.value)}
                {...register("mobileNumber")}
                  class={
                    editMode ? " profileinput2" : " profileinput2 disabled"
                  }
                  disabled={!editMode}
                />
              </div>
            </div>
            <div class="col-sm-12 col-md-9">
              <div class="About profilefirst">
                <p class="text-white inputlabel">About</p>
                <textarea
                  cols={10}
                  class={
                    editMode ? " profileinput2" : " profileinput2 disabled"
                  }
                  defaultValue={initialProfileData.about}
                //   onChange={(e) => setAbout(e.target.value)}
                {...register("about")}
                  disabled={!editMode}
                />
              </div>
              <p class="text-white inputlabel4">In Progress</p>
              <div class="profilefirst" style={{ position: "relative" }}>
                <h3>LEV.1</h3>
                <p class="text-white inputlabel2 largetext">
                  Intoduction to Data Analysis
                </p>
                <span class="instructor">Instructor: </span>
                <span class="text-white">Mohammed Nour</span>
              </div>
              <p class="text-white inputlabel4">Previous</p>
              <div class="profilefirst" style={{ position: "relative" }}>
                <h3>LEV.1</h3>
                <p class="text-white inputlabel2 largetext">
                  System analysis and design
                </p>
                <span class="instructor">Instructor: </span>
                <span class="text-white">Sarah Ahmed</span>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
}
