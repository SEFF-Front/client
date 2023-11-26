import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './addCourses.css'
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCourse } from '../../redux/reducers/CourseSlice';
import Dragdrop from '../../Drag drop/Dragdrop';
import toast from 'react-hot-toast';
function AddCourses(){
    const [courseDetails, setCourseDetails] = useState({
        courseName: '',
        level: '',
        numOfLessons: '',
        language: '',
        startDate: '',
        duration: '',
        certificate: '',
        courseIntroduction: '',
        courseAssessment: '',
        courseRequirements: '',
        courseMaterials: '',
        publishingDate: '',
        instructor: '',
        status:null,
        uploadedFile:null,
      });
    const dispatch = useDispatch()
      const handleInputChange = (e) => {
        const { id, value } = e.target;
        setCourseDetails({ ...courseDetails, [id]: value });
      };
      const handleFileDrop = (droppedFile) => {
        setCourseDetails({ ...courseDetails, uploadedFile: droppedFile });
      };
      const saveData = () => {
        console.log('Course Details:', courseDetails);
        setCourseDetails({ ...courseDetails, draft: true });
        const required = Object.keys(courseDetails).every(key => {
          if (courseDetails[key] !== undefined && courseDetails[key] !== '') {
            return true;
          }else{
            return false
          }
        })
        required?handleSuccess():toast.error("fill all fields");

        // Implement logic to save data to a database or perform other actions
        // For example: Send courseDetails to an API endpoint for storage
      };
      const handleSuccess =()=>{
        dispatch(addCourse(courseDetails));
        setCourseDetails({
        courseName: '',
        level: '',
        numOfLessons: '',
        language: '',
        startDate: '',
        duration: '',
        certificate: '',
        courseIntroduction: '',
        courseAssessment: '',
        courseRequirements: '',
        courseMaterials: '',
        publishingDate: '',
        instructor: '',
        pubplish:false,
        draft:false,
        uploadedFile:null,
      });
        toast.success('successfully uploaded')
      }
      const publishData = () => {
        console.log('Course Details:', courseDetails);
        setCourseDetails({ ...courseDetails, publish: true });
        dispatch(addCourse(courseDetails))
        // Implement logic to save data to a database or perform other actions
        // For example: Send courseDetails to an API endpoint for storage
      };
    return(
        <div class="container=">
    <div class="row mt-5 w-100">
      <div class="course-details col-md-12">
        <div class="inputs-container row p-3  text-white bg-opacity-25 bg-black">
          <div class="mb-3 d-flex justify-content-between course-header ">
            <div>
          <h5>Add Course Details</h5>
          <div class="details-line"></div>
            </div>
            <div>
              <button class="btn text-white" onClick={publishData}>PUBLISH</button>
            </div>
        </div>
        
         <div class="form-section col-md-6 col-lg-6 col-12">
          <label for="courseName">Course Name</label>
          <input type="text" id="courseName" class="form-control bg-secondary bg-opacity-25 " value={courseDetails.courseName}
            onChange={handleInputChange}/>
        </div>

        <div class="form-section col-md-2 col-lg-2 col-12">
          <label for="level">Level</label>
          <input type="text" id="level" class="form-control bg-secondary bg-opacity-25 " value={courseDetails.level}
            onChange={handleInputChange}/>
        </div>

        <div class="form-section col-md-4 col-lg-4 col-12">
          <label for="numOfLessons">Number of Lessons</label>
          <input type="text" id="numOfLessons" class="form-control bg-secondary bg-opacity-25  " value={courseDetails.language}
            onChange={handleInputChange}/>
        </div>

        <div class="form-section col-md-3 col-lg-3 col-12">
          <label for="language">Language</label>
          <input type="text" id="language" class="form-control bg-secondary bg-opacity-25 " value={courseDetails.courseName}
            onChange={handleInputChange}/>
        </div>

        <div class="form-section col-md-3 col-lg-3 col-12">
          <label for="startDate">Start Date</label>
          <div class="input-group input-group-icon">
            <span class="input-group-text  bg-secondary bg-opacity-25  "><FontAwesomeIcon icon={faCalendar} className='color-yellow ' /></span>
            <input type="text" id="startDate" class="form-control bg-secondary bg-opacity-25 "value={courseDetails.startDate}
            onChange={handleInputChange}/>
        </div>
        </div>

        <div class="form-section col-md-3 col-lg-3 col-12">
          <label for="duration">Duration</label>
          <div class="input-group input-group-icon">
            <span class="input-group-text  bg-secondary bg-opacity-25  "><FontAwesomeIcon icon={faClock} className='color-yellow' /></span>
            <input type="text" id="duration" class="form-control bg-secondary bg-opacity-25  " value={courseDetails.duration}
            onChange={handleInputChange}/>
        </div>
        </div>

        <div class="form-section col-md-3 col-lg-3 col-12">
          <label for="certificate">Certificate</label>
          <input type="text" id="certificate" class="form-control bg-secondary bg-opacity-25 " value={courseDetails.certificate}
            onChange={handleInputChange}/>
        </div>

        <div class="form-section col-12">
          <label for="courseIntroduction">Course Introduction</label>
          <textarea class="form-control bg-secondary bg-opacity-25  " id="courseIntroduction" rows="4" value={courseDetails.courseIntroduction}
            onChange={handleInputChange}></textarea>
        </div>

        <div class="form-section col-md-6 col-lg-6 col-12">
          <label for="courseAssessment">Course Assessment</label>
          <textarea class="form-control bg-secondary bg-opacity-25  " id="courseAssessment" rows="4" value={courseDetails.courseAssessment}
            onChange={handleInputChange}></textarea>
        </div>

        <div class="form-section col-md-6 col-lg-6 col-12">
          <label for="courseRequirements">Course Requirements</label>
          <textarea class="form-control bg-secondary bg-opacity-25  " id="courseRequirements" rows="4" value={courseDetails.courseRequirements}
            onChange={handleInputChange}></textarea>
        </div>

        <div class="form-section col-12">
          <label for="courseMaterials">Course Materials</label>
          <textarea class="form-control bg-secondary bg-opacity-25  " id="courseMaterials" rows="4" value={courseDetails.courseMaterials}
            onChange={handleInputChange}></textarea>
        </div>

        <div class="form-section col-md-3 col-lg-3 col-12">
          <label for="publishingDate">Publishing Date</label>
          <div class="input-group input-group-icon">
            <span class="input-group-text  bg-secondary bg-opacity-25  "><FontAwesomeIcon icon={faCalendar} className='color-yellow ' /></span>
            <input type="text" id="publishingDate" class="form-control  bg-secondary bg-opacity-25" value={courseDetails.publishingDate}
            onChange={handleInputChange}/>
        </div>
        </div>

        <div class="form-section col-md-3 col-lg-3 col-12">
          <label for="instructor">Instructor</label>
          <input type="text" id="instructor" class="form-control bg-secondary bg-opacity-25" value={courseDetails.instructor}
            onChange={handleInputChange} />
        </div>

        <div class="form-section col-12 mt-4">
          <label for="instructor">Upload Cover Photo</label>
          <div class="cover-photo"> <Dragdrop onFileDrop={handleFileDrop}/></div>
        </div>
        
        <div class="buttons row justify-content-end mx-auto mt-3">
          <button class="btn cancel-btn col-md-2 col-lg-2 col-12 text-white order-last order-md-first order-lg-first mx-2">CANCEL</button>
          <button class="btn save-btn col-md-2 col-lg-2 col-12 text-white ml-md-3 mb-3 mb-md-0 mb-lg-0 " onClick={saveData}>SAVE</button>
      </div>

    </div>
    </div>
    </div>
  </div>
    )
}
export default AddCourses;