import { faEdit, faPenToSquare, faSearch, faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { removeUser } from "../../redux/reducers/userSlice.";
import { useCallback, useEffect, useState } from "react";
import moment from "moment";
function UserStudent(){
  const [search,setSearch]=useState("");
  // const users = useSelector(state=>state.users)
  // const userStudents = users?.filter(user=> user.role === 'Student')
  // let diplayedArr = userStudents;
  // if(search){
  //   diplayedArr=userStudents.filter((el)=>el?.lName.toLowerCase()?.includes(search.toLowerCase())||el?.fName.toLowerCase()?.includes(search.toLowerCase()))
  // }else{
  //   diplayedArr = userStudents;
  // }
  const dispatch = useDispatch()
  // useEffect(()=>{
  //     dispatch(fetchCourses())
  // }
  //     ,[])
  const [isMobile , setIsMobile] = useState(false)
  const [availableWidth ,setAvailableWidth ] = useState(window.innerWidth)
  const handleMobileView = useCallback(() => {
    // console.log(availableWidth,isMobile,userStudents);
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
            {/* {diplayedArr?.map((user,index)=>(
              <div class="col-12 text-light user-part" key={index} >
              <button className={user.status?"table_btn publish_btn Active":"bg-secondary table_btn text-light"}>
              {user.status ? "Active" : "inActive"}
              </button>
                  <h4>Name</h4>
                  <p>{user.fName} {user.lName}</p>
                  <div class="d-flex  justify-content-between">
                  <div>
                        <h4>Role</h4>
                      <p>{user.role}</p>
                      </div>
                      <div>
                          <h4>User id </h4>
                          <p>{user.userId}</p>
                      </div>
                      
                  </div>
                  <div class="icons2 d-flex justify-content-end gap-2">
                    <FontAwesomeIcon icon={faEdit} className="table-icon" style={{color:"#bf9b30"}}/>
                    <FontAwesomeIcon icon={faTrash} onClick={()=>dispatch(removeUser(user))} className="table-icon" style={{color:"#bf9b30"}}/>
                  </div>
              </div>))} */}
              <Link to="/adminPanel/addUsers">
              <button class="btn row_btn col-12 text-light mt-4" href="#" role="button" style={{background:"#bf9b30"}}>Create New user</button></Link>
            </div>)
            
          : <div class="user-sec  ">
          <Link to="/adminPanel/addUsers">
          <button className="btn color-yellow ps-4 m-2 d-block pe-4 p-2 ms-auto" style={{border:"1px solid #bf9b30"}}> Create new user</button>
          </Link>
              <div class="article-search d-lg-flex justify-content-lg-between">
                <h4 className="text-light">users</h4>
                <div class="search-div">
                  <input type="text" placeholder="Search For Jobs" onChange={(e)=>{setSearch(e.target.value)}} style={{borderRadius:"5px",padding:"5px"}}/>
                  <FontAwesomeIcon icon={faSearch} className="text-warning"/>
                </div>
              </div>
              <div class="user-content">
                <table class="  table table-borderless text-light mx-auto table-responsive-sm    ">
                  <thead className="m-3">
                    <tr>
                    <th class="col">Title</th>
                    <th class="col">Status</th>
                    <th class="col">User id</th>
                    <th class="col">Role</th>
                    <th class="col"></th>
                </tr>
                  </thead>
                  <tbody>
                    {/* {
                      diplayedArr?.map((user,index)=>(
                        <tr key={index}>
                          <td>{user.fName} {user.lName}</td>
                          <td><button className={user.status ? "" :"bg-secondary text-light"}>
                          {user.status ? "Active" : "inActive"}</button></td>
                          <td>{user.userId}</td>
                          <td>{user.role}</td>
                          <td>
                          <Link href="">
                            <FontAwesomeIcon icon={faPenToSquare} className='color-yellow' />
                          </Link> 
                          <Link href="" onClick={()=>dispatch(removeUser(user))}>
                            <FontAwesomeIcon icon={faTrashCan} className='color-yellow' />
                          </Link>
                          </td>
                        </tr>
                      ))
                    } */}
                  </tbody>
            </table>
              </div>
            </div>

        }

        </>
    )
}
export default UserStudent;