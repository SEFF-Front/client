import "./addUser.css";
// import { addUser } from '../../redux/reducers/userSlice';
import React, { useState } from "react";
// import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createUser } from "../../redux/reducers/userSlice";
function AddUser() {
  
  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Function to handle saving data (you may customize this logic)
  const saveData = () => {
    // Implement your logic to save the formData
    console.log("Form data:", formData);
    const required = Object.keys(formData).every((key) => {
      if (formData[key] !== undefined && formData[key] !== "") {
        return true;
      } else {
        console.log(formData[key]);
        return false;
      }
    });
    required ? handleSuccess() : toast.error("fill all fields");
  };
  const handleSuccess = () => {
    // dispatch(addUser(formData));
    setFormData({
      fName: "",
      lName: "",
      status: "Active",
      email: "",
      role: "Student",
      mobNum: "",
      userId: "",
      password: "",
      passwordConfirmation: "",
      score: 0,
    });
    toast.success("successfully uploaded");
  };
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    status: "Active",
    email: "",
    role: "Student",
    mobNum: "",
    userId: "",
    password: "",
    passwordConfirmation: "",
    score: 0,
  });

  const dispatch = useDispatch();

  
  const publishData = () => {
    // Implement your logic to save the formData
    console.log("Form data:", formData);
    // dispatch(addUser(formData))
    // You might want to handle the data-saving process using state or sending it to an API.
  };

  /********************** */  
  // const [password, setPassword] = useState('');
  // const [passwordConfirmation, setPasswordConfirmation] = useState('');
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm();

  const onSubmit = (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== undefined)
    );
    if (Object.keys(filteredData).length === 0) {
      toast.warn("No data to submit.");
      return;
    }
    console.log(filteredData);
    console.log(filteredData.password !== filteredData.passwordConfirmation);

    if (filteredData.password === filteredData.passwordConfirmation) {
      delete filteredData.passwordConfirmation;
      dispatch(createUser(filteredData))
        .unwrap()
        .then(() => {
          toast.success("Profile Successfully Created");
          reset();
        })
        .catch((backendError) => {
          console.log(backendError);
          toast.error(backendError.error);
        });
    } else {
      toast.error("Passwords do not match.");
      return;
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="course-details col-md-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="inputs-container row p-3  text-white bg-opacity-25 bg-black"
          >
            <div className="mb-3 d-flex justify-content-between course-header ">
              <div>
                <h5>Add User Details</h5>
                <div className="user-line"></div>
              </div>
              {/* <div>
                  <button className="btn text-white">PUBLISH</button>
                </div> */}
            </div>

            <div className="form-section col-md-5 col-lg-5 col-12">
              <label for="fName">First Name</label>
              <input
                type="text"
                id="fName"
                required
                // value={formData.fName}
                // onChange={handleInputChange}
                {...register("firstName")}
                className="form-control bg-secondary bg-opacity-25 "
              />
            </div>

            <div className="form-section col-md-5 col-lg-5 col-12">
              <label for="lName">Last Name</label>
              <input
                type="text"
                id="lName"
                // value={formData.lName}
                // onChange={handleInputChange}
                {...register("lastName")}
                className="form-control bg-secondary bg-opacity-25 "
              />
            </div>

            <div className="form-section col-md-2 col-lg-2 col-12">
              <label for="status">Status</label>
              <select
                {...register("accountStatus")}
                className="form-select text-white bg-secondary bg-opacity-25 border-0"
                id="status"
                // value={formData.status}
                // onChange={handleInputChange}
                aria-label=".form-select"
              >
                <option selected value="Active" className="bg-secondary">
                  Active
                </option>
                <option value="Inactive" className="bg-secondary">
                  Inactive
                </option>
              </select>
            </div>

            {/* <div className="form-section col-md-8 col-lg-8 col-12">
              <label for="email">Email Address</label>
              <input
                type="email"
                id="email"
                // value={formData.email}
                // onChange={handleInputChange}

                className="form-control bg-secondary bg-opacity-25 "
              />
            </div> */}
            <div className="form-section col-md-6 col-lg-6 col-12">
              <label for="score">Score</label>
              <input
                type="number"
                id="score"
                // value={formData.score}
                // onChange={handleInputChange}
                {...register("score")}
                className="form-control bg-secondary bg-opacity-25"
              />
            </div>

            <div className="form-section col-md-6 col-lg-6 col-12">
              <label for="role">Role</label>
              <select
                className="form-select text-white bg-secondary bg-opacity-25 border-0"
                id="role"
                // value={formData.role}
                // onChange={handleInputChange}
                {...register("role")}
                aria-label=".form-select"
              >
                <option selected value="Student" className="bg-secondary">
                  Student
                </option>
                <option value="Admin" className="bg-secondary">
                  Admin
                </option>
                <option value="Instructor" className="bg-secondary">
                  Instructor
                </option>
              </select>
            </div>

            <div className="form-section col-md-6 col-lg-6 col-12">
              <label for="mobNum">Mobile Number</label>
              <input
                type="text"
                id="mobNum"
                // value={formData.mobNum}
                // onChange={handleInputChange}
                {...register("mobileNumber")}
                className="form-control bg-secondary bg-opacity-25"
              />
            </div>

            <div className="form-section col-md-6 col-lg-6 col-12">
              <label for="user-id">User ID</label>
              <input
                type="text"
                id="userId"
                // value={formData.userId}
                // onChange={handleInputChange}
                {...register("userId")}
                className="form-control bg-secondary bg-opacity-25"
              />
            </div>

            <div className="form-section col-md-6 col-lg-6 col-12">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="form-control bg-secondary bg-opacity-25"
              />
            </div>

            <div className="form-section col-md-6 col-lg-6 col-12">
              <label for="password-conf">Password Confirmation</label>
              <input
                type="password"
                id="passwordConfirmation"
                {...register("passwordConfirmation")}
                className="form-control bg-secondary bg-opacity-25"
              />
            </div>

            <div className="buttons row gap-3 justify-content-end mx-auto mt-3">
              <button
                type="reset"
                className="btn cancel-btn col-md-2 col-lg-2 col-12 text-white order-last order-md-first order-lg-first"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="btn save-btn col-md-2 col-lg-2 col-12 text-white ml-md-3 mb-3 mb-md-0 mb-lg-0"
                // onClick={saveData}
              >
                SAVE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddUser;
