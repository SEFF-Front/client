import { useDispatch, useSelector } from "react-redux";
function Applications(){

  const applications = useSelector(state=>state.applications)
  console.log(applications)
  const dispatch = useDispatch()
  // useEffect(()=>{
  //     dispatch(fetchapplications())
  // }
  //     ,[])

    return(
        <>
        <div class="article-sec  ">
          {/* <button className="btn btn-outline-warning ps-4 m-2 d-block pe-4 p-2 ms-auto" style={{transform:'translateY(-50px)'}}> Create new article</button> */}
              <div class="article-search d-lg-flex justify-content-lg-between">
                <h4 className="text-light">applications</h4>
                <div class="search-div">
                  <input type="text" placeholder="Search For Jops"/>
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
        </>
    )
}
export default Applications;