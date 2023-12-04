import "./editUser.css";
// import { EditUser } from '../../redux/reducers/userSlice';
import React, { useEffect,useRef } from "react";
// import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateUser } from "../../redux/reducers/userSlice";
function EditUser() {

  /********************** */
  const { getUser:user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate =useNavigate()
  console.log(user)
  if (!user) {
    navigate("/adminPanel/users");
  }
  const initialUserDataRef = useRef({
    firstName: user?.firstName ?? null,
    lastName: user?.lastName ?? null,
    userId: user?.userId,
    role: user?.role,
    accountStatus: user?.accountStatus,
    score: user?.score ?? 0,
    mobileNumber: user?.mobileNumber ?? null,
    password: user?.password ?? null,
  });
  useEffect(() => {
    initialUserDataRef.current = {
      firstName: user?.firstName ?? null,
      lastName: user?.lastName ?? null,
      userId: user?.userId,
      role: user?.role,
      accountStatus: user?.accountStatus,
      score: user?.score ?? 0,
      mobileNumber: user?.mobileNumber ?? null,
      password: user?.password ?? null,
    };
  }, [user]);
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
    if (filteredData.password === filteredData.passwordConfirmation) {
      delete filteredData.passwordConfirmation;
      delete filteredData.password;

      dispatch(updateUser({_id:user._id,userData:filteredData}))
        .unwrap()
        .then(() => {
          toast.success("Profile Successfully Updated");
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
    <div class="container">
      <div class="row mt-5">
        <div class="course-details col-md-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            class="inputs-container row p-3  text-white bg-opacity-25 bg-black"
          >
            <div class="mb-3 d-flex justify-content-between course-header ">
              <div>
                <h5>Edit User Details</h5>
                <div class="user-line"></div>
              </div>
            </div>

            <div class="form-section col-md-5 col-lg-5 col-12">
              <label for="fName">First Name</label>
              <input
               defaultValue={initialUserDataRef.current.firstName}
                type="text"
                id="fName"
                required
               
                {...register("firstName")}
                class="form-control bg-secondary bg-opacity-25 "
              />
            </div>

            <div class="form-section col-md-5 col-lg-5 col-12">
              <label for="lName">Last Name</label>
              <input
               defaultValue={initialUserDataRef.current.lastName}
                type="text"
                id="lName"
                {...register("lastName")}
                class="form-control bg-secondary bg-opacity-25 "
              />
            </div>

            <div class="form-section col-md-2 col-lg-2 col-12">
              <label for="status">Status</label>
              <select
                {...register("accountStatus")}
                class="form-select text-white bg-secondary bg-opacity-25 border-0"
                id="status"
                aria-label=".form-select"
              >
                <option selected={initialUserDataRef.current.accountStatus==="Active"}  value="Active" class="bg-secondary">
                  Active
                </option>
                <option selected={initialUserDataRef.current.accountStatus==="Inactive"}  value="Inactive" class="bg-secondary">
                  Inactive
                </option>
              </select>
            </div>

            <div class="form-section col-md-6 col-lg-6 col-12">
              <label for="score">Score</label>
              <input
               defaultValue={initialUserDataRef.current.score}
                type="number"
                id="score"
                {...register("score")}
                class="form-control bg-secondary bg-opacity-25"
              />
            </div>

            <div class="form-section col-md-6 col-lg-6 col-12">
              <label for="role">Role</label>
              <select
                class="form-select text-white bg-secondary bg-opacity-25 border-0"
                id="role"
                {...register("role")}
                aria-label=".form-select"
              > 
                <option selected={initialUserDataRef.current.role==="Student"}   value="Student" class="bg-secondary">
                  Student
                </option>
                <option selected={initialUserDataRef.current.role==="Admin"} value="Admin" class="bg-secondary">
                  Admin
                </option>
                <option selected={initialUserDataRef.current.role==="Instructor"} value="Instructor" class="bg-secondary">
                  Instructor
                </option>
              </select>
            </div>

            <div class="form-section col-md-6 col-lg-6 col-12">
              <label for="mobNum">Mobile Number</label>
              <input
               defaultValue={initialUserDataRef.current.mobileNumber}
                type="text"
                id="mobNum"
                {...register("mobileNumber")}
                class="form-control bg-secondary bg-opacity-25"
              />
            </div>

            <div class="form-section col-md-6 col-lg-6 col-12">
              <label for="user-id">User ID</label>
              <input
               defaultValue={initialUserDataRef.current.userId}
                type="text"
                id="userId"
                {...register("userId")}
                class="form-control bg-secondary bg-opacity-25"
              />
            </div>

            <div class="form-section col-md-6 col-lg-6 col-12">
              <label for="password">Password</label>
              <input
               defaultValue={initialUserDataRef.current.password}
                type="password"
                id="password"
                {...register("password")}
                class="form-control bg-secondary bg-opacity-25"
              />
            </div>

            <div class="form-section col-md-6 col-lg-6 col-12">
              <label for="password-conf">Password Confirmation</label>
              <input
                type="password"
                id="passwordConfirmation"
                {...register("passwordConfirmation")}
                class="form-control bg-secondary bg-opacity-25"
              />
            </div>

            <div class="buttons row gap-3 justify-content-end mx-auto mt-3">
              <button
                type="reset"
                class="btn cancel-btn col-md-2 col-lg-2 col-12 text-white order-last order-md-first order-lg-first"
              >
                CANCEL
              </button>
              <button
                type="submit"
                class="btn save-btn col-md-2 col-lg-2 col-12 text-white ml-md-3 mb-3 mb-md-0 mb-lg-0"
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
export default EditUser;
