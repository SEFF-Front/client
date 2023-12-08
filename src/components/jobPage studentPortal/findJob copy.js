import React, {  useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faClock, faCloudArrowUp, faFilter, faLocationDot, faMagnifyingGlass, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import './Jobsstyle.css'
import Title from "../title/title";
import Dragdrop from "../Drag drop/Dragdrop";
import { useDispatch } from "react-redux";
import Footer from "../footer/Footer";
import { addApplication } from "../redux/reducers/ApplicationSlice";
export default function FindJobs(){
    const jobs = [
        {id:1, title: 'Front-end React Developer', location: 'New York', jobType: 'Full-time', jobLevel: 'Entry-level', salary: 5000 ,data:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",about:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",req:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
        {id:2, title: 'Back-end  JS Developer', location: 'New York', jobType: 'Part-time', jobLevel: 'Entry-level', salary: 5000,data:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",about:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",req:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
        {id:3, title: 'Front-end React Developer', location: 'San Francisco', jobType: 'Part-time', jobLevel: 'Intermediate', salary: 8000,data:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",about:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",req:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
        {id:4, title: 'Front-end React Developer', location: 'New York', jobType: 'Remote', jobLevel: 'Expert', salary: 12000,data:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",about:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",req:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
        {id:5, title: 'Front-end React Developer', location: 'New York', jobType: 'Full-time', jobLevel: 'Entry-level', salary: 5000,data:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",about:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",req:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
        {id:6, title: 'Back-end  JS Developer', location: 'San Francisco', jobType: 'Part-time', jobLevel: 'Intermediate', salary: 8000,data:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",about:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",req:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
        {id:7, title: 'Back-end  JS Developer', location: 'New York', jobType: 'Full-time', jobLevel: 'Expert', salary: 12000,data:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",about:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",req:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
      ];
      var jobData=jobs;
      var [location,setLocation]=useState("");
      var [jobType,setJobType]=useState([]);
      var [jobLevel,setjobLevel]=useState([]);
      var [salaryRange,setSalaryRange]=useState([]);
      var [details,setDetails]=useState(false);
      var [form,setForm]=useState(false);
      var [search,setSearch]=useState("");
      var [clicked,setClicked]=useState(false);
      var[menu,setMenu]=useState(false)
      var [file,setFile]=useState(null);
      var [currentJob,setCurrentJob]=useState({});
      var selectRef=useRef(null)
      const inputRef = React.useRef(null);
      const [dragActive, setDragActive] = React.useState(false);
      const handleDrag = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
          setDragActive(true);
        } else if (e.type === "dragleave") {
          setDragActive(false);
        }
      };
        const [formData,setFormData] = useState([{
            email:'',
            experience:'',
            mobNum:'',
            uploadedFile:null,
        }])
      const dispatch = useDispatch()
const handleInputChange = (e) => {
  const { id, value } = e.target;
  setFormData({ ...formData, [id]: value });
};

const handleFileDrop = (droppedFile) => {
    setFormData({ ...formData, uploadedFile: droppedFile });
};
const handleSubmit =()=>{
    dispatch(addApplication(formData))
}
    //   const handleDrop = function(e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     setDragActive(false);
    //     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    //       setFile(e.dataTransfer.files[0]);
    //     }
    //   };
    //   const handleChange = function(e) {
    //     e.preventDefault();
    //     if (e.target.files && e.target.files[0]) {
    //       setFile(e.target.files[0])
    //     }
    //   };
      const onButtonClick = () => {
        inputRef.current.click();
      };
      var handleClear=()=>{
        const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
        checkboxes.forEach(checkbox => checkbox.checked = false); 
        setLocation("");
        setJobType("");
        setjobLevel("");
        setSalaryRange("");
        selectRef.current.value=""
      }
      var handleDetails=(id)=>{
        setDetails(true)
        var job=jobs.find((el)=>el.id==id);
        setCurrentJob(job)
      }
      var data=jobData
      if(search&&clicked){
        data=data.filter((el)=>el?.title?.includes(search))
      }
      if(location){
        data=data.filter((el)=>el?.location?.includes(location))
      }
      if(jobType.length>0){
        var arr=[]
            for (let item of jobType) {
                for (let el of data){
                    if (el?.jobType?.includes(item)){
                        arr.push(el)
                    }
                }
            }
            data=arr
        }
      if(jobLevel.length>0){
        var arr=[]
            for (let item of jobLevel) {
                for (let el of data){
                    if (el?.jobLevel?.includes(item)){
                        arr.push(el)
                    }
                }
            }
            data=arr
        }
      if(salaryRange.length>0){
        var arr=[]
            for (let item of salaryRange) {
                for (let el of data){
                    var tot;
                    if (el.salary < 4000) {
                        tot= '4000';
                      } else if (el.salary >= 4000 && el.salary <= 10000) {
                        tot= '4000-10000';
                      } else {
                        tot= '10000';
                      }
                    if (tot==item){
                        arr.push(el)
                    }
                }
            }
            data=arr
        }
const [currentPage, setCurrentPage] = useState(1); 
const [recordsPerPage] = useState(2);
const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
const currentRecords = data.slice(indexOfFirstRecord, 
  indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage)
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1)
  const nextPage = () => {
    if(currentPage !== nPages) 
        setCurrentPage(currentPage + 1)
}

const prevPage = () => {
    if(currentPage !== 1) 
        setCurrentPage(currentPage - 1)
}
        jobData=currentRecords
return(
    <><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1"/>
    <div className="body">
      <div className="position-relative">
      <div class="container">
      <div class="date  mt-5 mb-4">
      <div class="info-header">
      <Title title={'Find Job'}/>
      </div>
      </div>
    </div>
    <div class="d-flex container mb-5 justify-content-between head">
      <div class="jobLooking col-12">
        <h1>Looking for a job ?</h1>
        <p>Here you can find your best match between 1000s of updated and available positions</p>
      </div>
      <div class="searchBox justify-content-end">
        <span className="position-relative">
            <FontAwesomeIcon className="icon position-absolute" icon={faMagnifyingGlass} />
          <input placeholder="Search for a job" onChange={(e)=>{setSearch(e.target.value);setClicked(false)}}></input>
          <button type="button" onClick={()=>setClicked(true)}>SEARCH</button>
          <button type="button" id="menu" onClick={()=>setMenu(!menu)}>
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </span>
      </div>
    </div>
       
            
        <div class="container filter-side d-flex bd-highlight p-0">
          <div className={menu?"filter":"filter display-none"}>
            <aside class="job-filter pb-5">
              <div class="filter-head d-flex  p-2 align-items-baseline rounded">
              <h2 class="text-white mr-5 fs-5">Filters</h2>
              <button id="clear-filter" class="btn filter-btn" onClick={handleClear}>Clear All</button>
            </div>
            <div class="p-4">
              <div class="filter-item">
              <label for="location" class="text-white">Location:</label>
              <select id="location" class="form-select  text-light border-0" ref={selectRef} onChange={(e)=>setLocation(e.target.value)}>
                <option value="">All</option>
                <option value="New York">New York</option>
                <option value="San Francisco">San Francisco</option>
              </select>
              </div>
        <div class="filter-item">
              <label class="text-white">Job Type:</label>
<div class="form-check">
  <input type="checkbox" id="full-time" class="form-check-input" name="jobType" value="Full-time" onChange={(e)=>{e.target.checked?setJobType([...jobType,e.target.value]):setJobType ( jobType.filter(item => item !== e.target.value))}}/>
  <label for="full-time" class="form-check-label text-white">Full-time</label>
</div>
<div class="form-check">
  <input type="checkbox" id="part-time" class="form-check-input" name="jobType" value="Part-time" onChange={(e)=>{e.target.checked?setJobType([...jobType,e.target.value]):setJobType ( jobType.filter(item => item !== e.target.value))}}/>
  <label for="part-time" class="form-check-label text-white">Part-time</label>
</div>
<div class="form-check">
  <input type="checkbox" id="remote" class="form-check-input" name="jobType" value="Remote" onChange={(e)=>{e.target.checked?setJobType([...jobType,e.target.value]):setJobType ( jobType.filter(item => item !== e.target.value))}}/>
  <label for="remote" class="form-check-label text-white">Remote</label>
</div>
</div>
<div class="filter-item">
<label class="text-white">Job Level:</label>
<div class="form-check">
  <input type="checkbox" id="entry-level" class="form-check-input" name="jobLevel" value="Entry-level" onChange={(e)=>{e.target.checked?setjobLevel([...jobLevel,e.target.value]):setjobLevel ( jobLevel.filter(item => item !== e.target.value))}}/>
  <label for="entry-level" class="form-check-label text-white">Entry Level</label>
</div>
<div class="form-check">
  <input type="checkbox" id="intermediate" class="form-check-input" name="jobLevel" value="Intermediate" onChange={(e)=>{e.target.checked?setjobLevel([...jobLevel,e.target.value]):setjobLevel ( jobLevel.filter(item => item !== e.target.value))}}/>
  <label for="intermediate" class="form-check-label text-white">Intermediate</label>
</div>
<div class="form-check">
  <input type="checkbox" id="expert" class="form-check-input" name="jobLevel" value="Expert" onChange={(e)=>{e.target.checked?setjobLevel([...jobLevel,e.target.value]):setjobLevel ( jobLevel.filter(item => item !== e.target.value))}}/>
  <label  class="form-check-label text-white">Expert</label>
</div>
</div>
<div class="filter-item">
<label class="text-white">Salary Range:</label>
<div class="form-check">
  <input type="checkbox" id="salary-1" class="form-check-input" name="salaryRange" value="4000" onChange={(e)=>{e.target.checked?setSalaryRange([...salaryRange,e.target.value]):setSalaryRange ( salaryRange.filter(item => item !== e.target.value))}}/>
  <label for="salary-1" class="form-check-label text-white">Less than $4000</label>
</div>
<div class="form-check">
  <input type="checkbox" id="salary-2" class="form-check-input" name="salaryRange" value="4000-10000" onChange={(e)=>{e.target.checked?setSalaryRange([...salaryRange,e.target.value]):setSalaryRange ( salaryRange.filter(item => item !== e.target.value))}}/>
  <label for="salary-2" class="form-check-label text-white">$4000 - $10000</label>
</div>
<div class="form-check">
  <input type="checkbox" id="salary-3" class="form-check-input" name="salaryRange" value="10000" onChange={(e)=>{e.target.checked?setSalaryRange([...salaryRange,e.target.value]):setSalaryRange ( salaryRange.filter(item => item !== e.target.value))}}/>
  <label for="salary-3" class="form-check-label text-white">More than $10000</label>
</div>
</div>
</div>
            </aside>
            <div class="mt-4">
              <button class="btn cv-btn text-light">CREATE YOUR CV</button>
            </div>
          </div>
            
            <div class="pl-3 flex-grow-1">
            { !details&&
            <div>{
            jobData.map((job,index)=>(
              <div class="div1 m-md-3"> 
                <div class="dd-info row">
                <div class="spn col-1 p-0 d-flex justify-content-center"><span style={{fontSize:"larger",fontWeight:"900",fontFamily:"Cambria,Cochin,Georgia,Times,Times New Roman,serif"}}>≡</span>IT</div>
                <div className="col-md-8 col-sm-12 p-0">
                <h2>{job.title}</h2>
                <p>IT solution , {job.location}</p>
                </div>
                <div class="info2 col-md-3 p-0 text-md-end"><h5>{job.salary} per month</h5>
                <p id="pi"> <FontAwesomeIcon icon={faLocationDot} style={{color: "#bf9b30"}} /> On Site</p>
                </div>
              </div>
              
                <p class="p-general">{job.data}</p>
                <button class="btn">React JS</button>
                <button class="btn">Develpment</button>

              <div class="view-details row d-flex m-0 mt-5  p-0">
                <div class=" col-6"><p class="p-details "><FontAwesomeIcon icon={faClock} style={{color:"grey"}}/>  2 h ago</p></div>
                <div className="col-6 d-flex justify-content-end m-0 p-0">
                <button class="btn-details" id="detail" onClick={()=>handleDetails(job.id)}>VIEW DETAILS</button>
                </div>
              </div>
              </div>
                ))}
                <nav>
<ul className='pagination justify-content-end'>
<li className="arrow">
<a className="arrow"
onClick={prevPage}
href="#">

<FontAwesomeIcon icon={faChevronLeft} />
</a>
</li>
{pageNumbers.map(pgNumber => (
<li key={pgNumber}
className= {`page-itm  rounded-circle border-1 border-warning border ${currentPage == pgNumber ? 'actve' : 'border border-light rounded-circle border-1'} `} >

<a onClick={() => setCurrentPage(pgNumber)}
className= {`page-itm ${currentPage == pgNumber ? 'actve' : ''} `}
href='#'>

{pgNumber}
</a>
</li>
))}
<li className="arrow me-3">
<a className="arrow"
onClick={nextPage}
href='#'>

<FontAwesomeIcon icon={faChevronRight} />
</a>
</li>
</ul>
</nav>
                </div>
                }
            { details&&!form&&
                <div class="div1 m-md-3"> 
                <div class="dd-info row">
                <div class="spn col-1 p-0 d-flex justify-content-center"><span style={{fontSize:"larger",fontWeight:"900",fontFamily:"Cambria,Cochin,Georgia,Times,Times New Roman,serif"}}>≡</span>IT</div>
                <div className="col-md-8 col-sm-12 p-0">
                <h2>{currentJob.title}</h2>
                <p>IT solution , {currentJob.location}</p>
                </div>
                <div class="info2 col-md-3 p-0 text-md-end"><h5>{currentJob.salary} per month</h5>
                <p id="pi"> <FontAwesomeIcon icon={faLocationDot} style={{color: "#bf9b30"}} /> On Site</p>
                </div>
              </div>

                <p class="p-general">{currentJob.data}</p>
                <button class="btn">React JS</button>
                <button class="btn">Develpment</button>
                <h2>About us</h2>
                <p class="p-general">{currentJob.about}</p>
                <h2>Job Description</h2>
                <p class="p-general">{currentJob.desc}</p>
                <h2>Job Requirments</h2>
                <p class="p-general">{currentJob.req}</p>
              <div class="view-details row d-flex m-0 mt-5  p-0">
                <div class=" col-6"><p class="p-details "><FontAwesomeIcon icon={faClock} style={{color:"grey"}}/>  2 h ago</p></div>
                <div className="col-6 d-flex justify-content-end">
                <button class="btn-details" onClick={()=>setForm(true)}>APPLY</button>
                </div>
              </div>
              </div>
                }
                { form&&
                <div class="view-details3 div1 m-md-3">
                  <div class="dd-info row">
                <div class="spn col-1 p-0 d-flex justify-content-center"><span style={{fontSize:"larger",fontWeight:"900",fontFamily:"Cambria,Cochin,Georgia,Times,Times New Roman,serif"}}>≡</span>IT</div>
                <div className="col-md-8 col-sm-12 p-0">
                <h2>{currentJob.title}</h2>
                <p>IT solution , {currentJob.location}</p>
                </div>
                <div class="info2 col-md-3 p-0 text-md-end"><h5>{currentJob.salary} per month</h5>
                <p id="pi"> <FontAwesomeIcon icon={faLocationDot} style={{color: "#bf9b30"}} /> On Site</p>
                </div>
              </div>
              <h2>Balqees Hamdi Sabir</h2>
              <p>Computer science, international islamic university</p>
                <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                 <div class="form-group3 row">
                  <div className="col-md-9">
                    <label for="email" class="lab1">Email</label>
                    <input type="email" class="form-control inp1" id="email" value={formData.email} onChange={handleInputChange}   name="email"/>
                  </div>
                  <div className="col-md-3">
                    <label for="num"  class="lab2">Years Of Experience</label>
                    <input type="number" class="form-control inp2" id="experience" value={formData.experience} onChange={handleInputChange} name="num"/>
                  </div>
                  <div className="col-md-6">
                    <label for="num3"  class="lab3">Mobile Number</label>
                    <input type="number" class="form-control inp3" id="mobNum" value={formData.mobNum} onChange={handleInputChange} name="num3"/>
                  </div>
                    <div className="col-md-12 mt-3">
                      <Dragdrop onFileDrop={handleFileDrop}/>
                    </div>
                    <div className="col-12 mt-5 d-flex justify-content-end">
                      <button class="cancel" onClick={()=>{setForm(false);setDetails(false)}}>Cancel</button>
                      <button class="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                  </div>
                 
               </form>
               </div>
                }
            </div>
          </div>
          </div>
    </div>
    <Footer/>
    </>
)
}