import { faEdit, faPenToSquare, faSearch, faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeJob } from "../../redux/reducers/JobSlice.";
import { useCallback, useEffect, useState } from "react";
function Jobs(){
  const [search,setSearch]=useState("");
  const jobs = useSelector(state=>state.jobs)
  let diplayedArr = jobs;
  if(search){
    diplayedArr=jobs.filter((el)=>el?.companyName.toLowerCase()?.includes(search.toLowerCase()))
  }else{
    diplayedArr = jobs;
  }
  const dispatch = useDispatch()
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
          isMobile ? (<div class="row m-0 mt-5 col-12" id="items" >
          {diplayedArr?.map((job,index)=>(
            <div class="col-12 text-light  user-part" key={index} id="item" >
            <button className={job.status?"table_btn publish_btn Active":"Active bg-secondary table_btn text-light"}>
            {job.status ? "opened" : "closed"}
            </button>
                <h4>company Name</h4>
                <p>{job.companyName}</p>
                <div class="d-flex flex-column  gap-2">
                    <div className="col-xs-12">
                        <h4>field</h4>
                        <p>{job.field}</p>
                    </div>
                    <div className="col-xs-12">
                      <h4>published data</h4>
                    <p>{job.date}</p>
                    </div>
                    <div className="col-xs-12">
                      <h4>published time</h4>
                    <p>{job.time}</p>
                    </div>
                </div>
                <div class="icons2 d-flex justify-content-end gap-2">
                  <FontAwesomeIcon icon={faEdit} className="table-icon" color="#bf9b30"/>
                  <FontAwesomeIcon icon={faTrash} onClick={()=>dispatch(removeJob(job))} className="table-icon" color="#bf9b30"/>
                </div>
            </div>))}
            <Link to="/adminPanel/addJobs">
          <button className="btn text-light col-12 ps-4 m-2 d-block ms-auto" style={{background:"#bf9b30"}}> Create new job</button>
          </Link>
          </div>)
          : <div class="article-sec  ">
          <Link to="/adminPanel/addJobs">
          <button className="btn btn-outline-warning ps-4 m-2 d-block pe-4 p-2 ms-auto" > Create new job</button>
          </Link>
              <div class="article-search d-lg-flex justify-content-lg-between">
                <h4 className="text-light">Jobs</h4>
                <div class="search-div">
                  <input type="text" placeholder="Search For Jops" onChange={(e)=>{setSearch(e.target.value)}}/>
                  <FontAwesomeIcon icon={faSearch} className="text-warning"/>
                </div>
              </div>
              <div class="article-content">
                <table class="  table table-borderless text-light mx-auto table-responsive-sm    ">
                  <thead className="m-3">
                    <tr>
                    <th class="col">Title</th>
                    <th class="col">position</th>
                    <th class="col">Status</th>
                    <th class="col">Posted at</th>
                    <th class="col">#Apllications</th>
                    <th class="col"></th>
                </tr>
                  </thead>
                  <tbody>
                    {
                      diplayedArr?.map((job,index)=>(
                        <tr key={index} className="text-light">
                          <td>{job.companyName}</td>
                          <td>{job.position}</td>
                          <td><button className={job.status?"table_btn publish_btn":"bg-secondary table_btn text-light"}>
                            {job.status ? "opened":"closed"}
                            </button></td>
                          <td>{job.date} <br/>{job.time}</td>
                          <td>{job.application}</td>
                          <td>
                          <Link href="">
                            <FontAwesomeIcon icon={faPenToSquare} className='text-warning' />
                          </Link> 
                          <Link href="" onClick={()=>dispatch(removeJob(job))}>
                            <FontAwesomeIcon icon={faTrashCan} className='text-warning' />
                          </Link>
                          </td>
                    </tr>
                      ))
                    }
                  </tbody>

            </table>
              </div>
            </div>
        }
        </>
    )
}
export default Jobs;