import { useCallback, useEffect, useState } from "react";
import './application.css'
import { useDispatch, useSelector } from "react-redux";
function Applications(){

  const applications = useSelector(state=>state.applications)
  console.log(applications)
  const dispatch = useDispatch()
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
  // useEffect(()=>{
  //     dispatch(fetchapplications())
  // }
  //     ,[])

    return(
        <>
        {
          isMobile ? (<div class="row m-0 mt-1 col-12" id="items" >
            <h2 className="text-light my-4">Applications for "job" at "company name"</h2>
            { 
                  applications?.map((applicant,index)=>(
                    <div class="col-12 text-light  user-part p-3" key={index} id="item" >
                <h4>Applicant</h4>
                <p>{applicant.title}</p>
                <div class="d-flex  gap-2 row">
                    <div className="col-5">
                        <h4>Experience</h4>
                        <p>{applicant.experience}</p>
                    </div>
                    <div className="col-6">
                      <h4>Email</h4>
                    <p>{applicant.email}</p>
                    </div>
                    <div className="col-xs-12">
                      <h4>Mobile Number</h4>
                    <p>{applicant.phone}</p>
                    </div>
                </div>
                <div class="d-flex col-12">
                  <button className="rounded p-2 w-100 text-uppercase text-light dcv">download cv</button>
                </div>
            </div>
                  ))
            }
          </div>):
        <div class="article-sec  ">
          {/* <button className="btn btn-outline-warning ps-4 m-2 d-block pe-4 p-2 ms-auto" style={{transform:'translateY(-50px)'}}> Create new article</button> */}
              <div class="article-search d-lg-flex justify-content-lg-between">
                <h4 className="text-light">applications</h4>
                <div class="search-div">
                  <input type="text" placeholder="Search For Jobs"/>
                  <i class="fas fa-search"></i>
                </div>
              </div>
              <div class="article-content">
                <table class="  table table-borderless text-light mx-auto table-responsive-sm    ">
                  <thead className="m-3">
                    <tr>
                    <th class="col">Applicatiant</th>
                    <th class="col">experience</th>
                    <th class="col">email </th>
                    <th class="col">mobile Number</th>
                    <th class="col"></th>
                </tr>
                  </thead>
                {
                  applications?.map((article,index)=>(
                    <tr key={index}>
                        <td>{article.title}</td>
                        <td>{article.experience}</td>
                        <td>{article.email}</td>
                        <td>{article.phone}</td>
                        <td><button  className="rounded-0">
                        Download
                        </button></td>
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
export default Applications;