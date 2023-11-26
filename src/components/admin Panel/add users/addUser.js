import { useDispatch } from 'react-redux';
import './addUser.css'
// import { addUser } from '../../redux/reducers/userSlice.';
import { useState } from 'react';
import toast from 'react-hot-toast';
function AddUser(){
    const [formData, setFormData] = useState({
        fName: '',
        lName: '',
        status: 'Active',
        email: '',
        role: 'Student',
        mobNum: '',
        userId: '',
        password: '',
        passwordConfirmation: '',
        score: 0,
      });
    const dispatch =useDispatch()
      // Function to handle form input changes
      const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
      };
    
      // Function to handle saving data (you may customize this logic)
      const saveData = () => {
        // Implement your logic to save the formData
        console.log('Form data:', formData);
        const required = Object.keys(formData).every(key => {
          if (formData[key] !== undefined && formData[key] !== ''){
            
            return true;
          }else{
            console.log(formData[key])
            return false
          }
        })
        required?handleSuccess():toast.error("fill all fields");
      
      };
      const handleSuccess =()=>{
        // dispatch(addUser(formData));
        setFormData({
          fName: '',
          lName: '',
          status: 'Active',
          email: '',
          role: 'Student',
          mobNum: '',
          userId: '',
          password: '',
          passwordConfirmation: '',
          score: 0,
        });
        toast.success('successfully uploaded');}
      const publishData = () => {
        // Implement your logic to save the formData
        console.log('Form data:', formData);
        // dispatch(addUser(formData))
        // You might want to handle the data-saving process using state or sending it to an API.
      };
    return(
        <div class="container">
        <div class="row mt-5">
          <div class="course-details col-md-12">
            <div class="inputs-container row p-3  text-white bg-opacity-25 bg-black">
              <div class="mb-3 d-flex justify-content-between course-header ">
                <div>
              <h5>Add User Details</h5>
              <div class="user-line"></div>
                </div>
                <div>
                  <button class="btn text-white">PUBLISH</button>
                </div>
            </div>
            
             <div class="form-section col-md-5 col-lg-5 col-12">
              <label for="fName">First Name</label>
              <input type="text" id="fName" required value={formData.fName}
                onChange={handleInputChange} 
                class="form-control bg-secondary bg-opacity-25 "/>
            </div>
    
            <div class="form-section col-md-5 col-lg-5 col-12">
              <label for="lName">Last Name</label>
              <input type="text" id="lName" value={formData.lName}
                onChange={handleInputChange} class="form-control bg-secondary bg-opacity-25 "/>
            </div>
    
            <div class="form-section col-md-2 col-lg-2 col-12">
              <label for="status">Status</label>
              <select class="form-select text-white bg-secondary bg-opacity-25 border-0" id="status"  value={formData.status} onChange={handleInputChange} aria-label=".form-select">
                <option selected class="bg-secondary">Active</option>
                <option value="1" class="bg-secondary">Inactive</option>
              </select>
            </div>
    
            <div class="form-section col-md-8 col-lg-8 col-12">
              <label for="email">Email Address</label>
              <input type="email" id="email" value={formData.email}
                onChange={handleInputChange}class="form-control bg-secondary bg-opacity-25 "/>
            </div>
    
    
            <div class="form-section col-md-4 col-lg-4 col-12">
              <label for="role">Role</label>
              <select class="form-select text-white bg-secondary bg-opacity-25 border-0" id="role"  value={formData.role} onChange={handleInputChange} aria-label=".form-select">
                <option selected value="Student" class="bg-secondary">Student</option>
                <option value="Admin" class="bg-secondary">Admin</option>
                <option value="Instructor" class="bg-secondary">Instructor</option>
                <option value="Editor" class="bg-secondary">Editor</option>
              </select>
            </div>
    
            <div class="form-section col-md-6 col-lg-6 col-12">
              <label for="mobNum">Mobile Number</label>
              <input type="text" id="mobNum" value={formData.mobNum}
                onChange={handleInputChange} class="form-control bg-secondary bg-opacity-25"/>
            </div>
    
            <div class="form-section col-md-6 col-lg-6 col-12">
              <label for="user-id">User ID</label>
              <input type="text" id="userId"  value={formData.userId}
                onChange={handleInputChange}class="form-control bg-secondary bg-opacity-25"/>
            </div>
    
            <div class="form-section col-md-6 col-lg-6 col-12">
              <label for="password">Password</label>
              <input type="password" id="password" value={formData.password}
                onChange={handleInputChange} class="form-control bg-secondary bg-opacity-25"/>
            </div>
    
            <div class="form-section col-md-6 col-lg-6 col-12">
              <label for="password-conf">Password Confirmation</label>
              <input type="password" id="passwordConfirmation" value={formData.passwordConfirmation}
                onChange={handleInputChange} class="form-control bg-secondary bg-opacity-25"/>
            </div>
            
            <div class="form-section col-md-4 col-lg-4 col-12">
              <label for="score">Score</label>
              <input type="number" id="score" value={formData.score}
                onChange={handleInputChange} class="form-control bg-secondary bg-opacity-25"/>
            </div>
    
         
            <div class="buttons row gap-3 justify-content-end mx-auto mt-3">
              <button class="btn cancel-btn col-md-2 col-lg-2 col-12 text-white order-last order-md-first order-lg-first">CANCEL</button>
              <button class="btn save-btn col-md-2 col-lg-2 col-12 text-white ml-md-3 mb-3 mb-md-0 mb-lg-0" onClick={saveData}>SAVE</button>
          </div>
    
        </div>
        </div>
        </div>
      </div>
    )
}
export default AddUser;