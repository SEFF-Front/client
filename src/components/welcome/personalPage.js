import'./personalPage.css'
import img from '../../assest/oooo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faCheckCircle, faFileAlt, faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons'
import Footer from '../footer/Footer'
import Title from '../title/title'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
function PersonalPage(){

    return(
        <>
        
    <div class="exams m-3 container mx-auto">
        <div className='container mx-auto '>
            <Title title={'student Panel'}/>
        </div>
        
    <div class="exams-container position-relative mt-3 ">
        <div className='d-flex justify-content-between container mb-5'>
        <div className='fs-2 ' style={{fontWeight:"700"}}>
        <span class=" text-uppercase text-white">welcome back </span>
        <span class="text-uppercase" style={{color:"#bf9b30"}}> tariq ali</span>
        </div>
        
        <Link to={"/profile"} class="text-white btn  btn 
             text-uppercase  view "
             ><button class="navbar-toggler p-0 m-0" type="button"
             data-bs-toggle = "collapse" data-bs-target = "#main" aria-controls="main" aria-expanded ="false"
             aria-label="Toggle navigation">VIEW PROFILE</button></Link>
        </div>
        
        
        <div class="course container p-3 px-1 px-sm-5 flex-wrap  justify-content-between  align-items-center  d-flex text-uppercase">
            <h3 class="text-white  fs-5  col-xs-12 mb-0"> <span class="badge p-4 me-2  text-white text-uppercase"
                style={{border:' 1px solid #bf9b30', fontSize: "23px"}} >1</span>upcoming exams</h3>

            <h3 class="text-white  fs-5  col-xs-12 mb-0"> <span class="badge p-4 me-2  text-white text-uppercase "
            style={{border:' 1px solid #bf9b30', fontSize:' 23px' }}>4</span>ongoing courses</h3>

            <h3 class="text-white  fs-5  col-xs-12 mb-0"> <span class="badge p-4 me-2  text-white text-uppercase "
            style={{border:' 1px solid #bf9b30', fontSize:' 23px' }}>2</span>completed courses</h3>

        </div> 
    </div> 
    </div>

        <div className='container mx-auto'>
            <h5 className='p-3 px-5 container  done text-light rounded text-uppercase' style={{maxWidth:"fit-content",marginLeft:"0"}}>
                <FontAwesomeIcon icon={faCheckCircle} className='text-light me-3' /> 
                 All clear, you don't have any exams today
            </h5>
        </div>

        <div class="row text-light mt-5 container mx-auto justify-content-between">
            <div class="col-xs-12 col-md-5">
                <h2 style={{fontWeight:"700"}}>Ongoing Courses</h2>
                <div class="d-flex flex-column">
                <div class="course mt-3 p-4">
                    <h6 style={{fontWeight:"700"}} className='mb-4'>Introdution to Date Analysis</h6>
                    <div class="row px-3 pt-3">
                    <div class="col-4  p-1" style={{fontWeight:"700"}}>LEV.1</div>
                    <div class="col-4  p-1">
                    <FontAwesomeIcon icon={faUser} style={{color:"#bf9b30"}}/> 20 Students
                    </div><Link to={"/StudentPanel/coursedetails"} className='col-4 '>
                    <button class="rounded border-0  course_button text-light p-1 font-weight-bold">VIEW DETAILS</button></Link>
                    </div>
                </div>
                <div class="course mt-3 p-4">
                    <h6 style={{fontWeight:"700"}} className='mb-4'>Introduction to Date Analysis</h6>
                    <div class="row px-3 pt-3">
                    <div class="col-4  p-1 font-weight-bold" style={{fontWeight:"700"}}>LEV.1</div>
                    <div class="col-4  p-1">
                    <FontAwesomeIcon icon={faUser} style={{color:"#bf9b30"}}/> 20 Students
                    </div><Link to={"/StudentPanel/coursedetails"} className='col-4 '>
                    <button class="rounded border-0 course_button text-light p-1 font-weight-bold ">VIEW DETAILS</button></Link>
                    </div>
                </div>
                </div>
            </div>

            <div class="col-xs-12 col-md-5">
                <div class="row">
                <h2 style={{fontWeight:"700"}} className='col-md-9'>Upcoming Exams</h2>
                <button class="col-3 d-none d-md-block  rounded border-0  course_button text-light font-weight-bold">CREATE NEW</button>
                </div>
                <div class="row mt-3 course p-2">
                <div class="col-3 text-center">
                    <div class="d-flex flex-column justify-content-center mt-2  ">
                    <span class=" rounded-top color_black bg-dark" style={{fontWeight:"700"}}>7TH</span>
                    <span class=" color_black bg-dark">JUN</span>
                    <span class=" rounded-bottom color_orange ">WED</span>
                    </div>
                </div>
                <div class="col-9 ">
                    <div class="d-flex flex-row justify-content-between">
                    <h6 style={{fontWeight:"700"}} className='mb-0'>Introduction to React js</h6>
                    <FontAwesomeIcon icon={faPenToSquare} style={{color:"#bf9b30"}}/>
                    </div>
                    <div  className='mb-4'>
                    <span class="course_coler" style={{fontWeight:"700"}}>Instructor </span>
                    <span class="text-light"> : Tariq Ali</span>
                    </div>
                    <div class="d-flex flex-row justify-content-between pt-1">
                    <h6 style={{fontWeight:"700"}}>Lev.1 Exam</h6>
                    <span><FontAwesomeIcon icon={faClock} style={{color:"grey"}}/> 12:30 PM</span>
                    </div>
                </div>
                </div>
            </div>

        </div>
        <div class="mb-3 mt-5 container  text-light">
          <h4 style={{fontWeight:"700"}}>Upcoming Courses</h4>
        </div>
        <div class="row justify-content-center gap-3 z">
            
        <div class="col-xs-12 col-md-5 text-light">
            <div class="row parent_top_courses  course  ">
              <div class="col-xs-12 col-md-4 img_rel p-0 ">
                <img class="sec3_img " src={img}/>
                <p class="left_courses font-weight-bold d-none d-md-block  ">LEV.1</p>
              </div>
              <div class="col-xs-12 col-md-8 p-3 d-inline-flex flex-column ">
                <h5>Python for Beginners</h5>
                <div className=' d-flex flex-column'>   
                    <div >
                    <FontAwesomeIcon icon={faCalendarAlt} style={{color:"#bf9b30"}}/><small> Wednesday,June 7th</small> 
                    </div>
                    <div >
                    <FontAwesomeIcon icon={faFileAlt}  style={{color:"#bf9b30"}}/><small> 12 lessons</small> 
                    </div><Link to={"/StudentPanel/coursedetails"}>
                    <button class="ms-auto  rounded border-0 course_button mt-2 p-2 text-light">VIEW DETAILS</button></Link>
              </div>
              </div>
              <div class="left_courses2 font-weight-bold d-md-none d-lg-none  d-xs-block d-sm-block
              my-3 ml-2 ">LEV.1</div>
              </div>
          </div>
          <div class="col-sm-12 col-md-5 text-light">
            <div class="row parent_top_courses  course  ">
              <div class="col-xs-12 col-md-4 img_rel p-0 ">
                <img class="sec3_img " src={img}/>
                <p class="left_courses font-weight-bold d-none d-md-block  ">LEV.1</p>
              </div>
              <div class="col-xs-12 col-md-8 p-3 d-inline-flex flex-column ">
                <h5>Python for Beginners</h5>
                <div className=' d-flex flex-column'>   
                    <div >
                    <FontAwesomeIcon icon={faCalendarAlt} style={{color:"#bf9b30"}}/><small> Wednesday,June 7th</small> 
                    </div>
                    <div >
                    <FontAwesomeIcon icon={faFileAlt}  style={{color:"#bf9b30"}}/><small> 12 lessons</small> 
                    </div>
                    <Link to={"/StudentPanel/coursedetails"}>
                    <button class="ms-auto  rounded border-0 course_button mt-2 p-2 text-light">VIEW DETAILS</button></Link>
              </div>
              </div>
              <div class="left_courses2 font-weight-bold d-md-none d-lg-none  d-xs-block d-sm-block
              my-3 ml-2 ">LEV.1</div>
              </div>
          </div>
        </div>
        <Footer/>
        </>
    )
}
export default PersonalPage