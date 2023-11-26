import { faEdit, faPenToSquare, faSearch, faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeCourse } from "../../redux/reducers/CourseSlice";
import { useCallback, useEffect, useState } from "react";

function DraftCourses(){
  const courses = useSelector(state=>state.courses)
  const DraftCourses = courses.filter(course=>course.status === false)
  const dispatch = useDispatch()
  var [search,setSearch]=useState("");
  let diplayedArr = DraftCourses;
  if(search){
    diplayedArr=DraftCourses.filter((el)=>el?.courseName.toLowerCase()?.includes(search.toLowerCase()))
  }else{
    diplayedArr = DraftCourses;
  }
  // useEffect(()=>{
  //     dispatch(fetchCourses())
  // }
  //     ,[])
  const [isMobile , setIsMobile] = useState(false)
  const [availableWidth ,setAvailableWidth ] = useState(window.innerWidth)
  const handleMobileView = useCallback(() => {
    console.log(availableWidth,isMobile);
    if (availableWidth <= 778) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [availableWidth]);

  useEffect(() => {
    const handleResize = () => {
      setAvailableWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    handleMobileView();
  }, [handleMobileView]);
  
    return(
        <>
        {
        isMobile ?  (<div class="row m-0 mt-5 col-12" id="items" >
        {diplayedArr?.map((course,index)=>(
          <div class="col-12 text-light  user-part" key={index} id="item" >
          <button className={course.status?"table_btn publish_btn Active":" Active bg-secondary table_btn text-light"}>
          {course.status ? "Active" : "inActive"}
          </button>
              <h4>Title</h4>
              <p>{course.courseName}</p>
              <div class="d-flex flex-wrap  justify-content-between">
                  <div className="w-50">
                      <h4>level</h4>
                      <p>{course.level}</p>
                  </div>
                  <div className="w-50">
                    <h4>num Of Lessons</h4>
                    <p>{course.numOfLessons}</p>
                  </div>
                  <div className="w-50">
                    <h4>language</h4>
                    <p>{course.language}</p>
                  </div>
                  <div className="w-50">
                    <h4>start Date</h4>
                    <p>{course.startDate}</p>
                  </div>
                  <div className="w-50">
                    <h4>duration</h4>
                    <p>{course.duration}</p>
                  </div>
                  <div className="w-50">
                    <h4>publishing Date</h4>
                    <p>{course.date}</p>
                  </div>
              </div>
              <div class="icons2 d-flex justify-content-end gap-2">
                <FontAwesomeIcon icon={faEdit} className="table-icon" color="#bf9b30"/>
                <FontAwesomeIcon icon={faTrash} onClick={()=>dispatch(removeCourse(course))} className="table-icon" color="#bf9b30"/>
              </div>
          </div>))}
          <Link to="/adminPanel/addCourses">
          <button className="btn col-12 ps-4 m-2 d-block pe-4 p-2 ms-auto text-light" style={{background:"#bf9b30"}}> Create new course</button>
          </Link>
        </div>)
        :<div class="article-sec  ">
        <Link to="/adminPanel/addCourses" >
        <button className="btn color-yellow ps-4 m-2 d-block pe-4 p-2 ms-auto" style={{border:"1px solid #bf9b30"}}> Create new course</button>
        </Link>
            <div class="article-search d-lg-flex justify-content-lg-between">
              <h4 className="text-light">Courses</h4>
              <div class="search-div">
                <input type="text" placeholder="Search For Jobs" onChange={(e)=>{setSearch(e.target.value)}} style={{padding:"5px",borderRadius:"5px"}}/>
                <FontAwesomeIcon icon={faSearch} className="text-warning"/>
              </div>
            </div>
            <div class="article-content">
              <table class="  table table-borderless text-light mx-auto table-responsive-sm    ">
                <thead className="m-3">
                  <tr>
                  <th class="col">Title</th>
                  <th class="col">status</th>
                  <th class="col">instructor</th>
                  <th class="col">level</th>
                  <th class="col">start date</th>
                  <th class="col">published on</th>
                  <th class="col"></th>
              </tr>
                </thead>
                {
                  diplayedArr?.map((course,index)=>(
                  <tr key={index}>
                    <td>{course.courseName}</td>
                    <td><button className={course.status?"":"bg-secondary text-light"}>
                      {course.status?'open':"ended"}
                      </button></td>
                    <td>{course.instructor}</td>
                    <td>{course.level}</td>
                    <td>{course.startDate}</td>
                    <td>{course.date} <br/>{course.time}</td>
                    <td>
                    <Link href="" >
                      <FontAwesomeIcon icon={faPenToSquare} className='color-yellow' />
                    </Link> 
                    <Link href="" onClick={()=>dispatch(removeCourse(course))}>
                      <FontAwesomeIcon icon={faTrashCan} className='color-yellow' />
                    </Link>
                    </td>
                  </tr>
                  ))
                }
            
          </table>
            </div>
          </div>
        }
        </>
    )
}
export default DraftCourses;