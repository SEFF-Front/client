import {
  faEdit,
  faPenToSquare,
  faSearch,
  faTrash,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers ,getUser} from "../../redux/reducers/userSlice";

// import {getAllUsers} from '../../redux/reducers/userSlice'
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Pagination from "../../pagination/pagination";

function Users() {
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const [queries, setQueries] = useState({
    page: 1,
    fieldValue: "",
    fieldName: "",
    searchBy: "userId",
    searchValue: "",
  });
  const handlePageChange = (page) => {
    setQueries((prevQueries) => ({ ...prevQueries, page }));
  };

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    setQueries({
      ...queries,
      page:1,
      searchValue: search,
    });
  };

  useEffect(() => {
    dispatch(getAllUsers(queries));
  }, [dispatch, queries]);

  const { users ,pagination } = useSelector((state) => state.user);
  const {total, limit, page, pages}=pagination
  let allUsers = users;
const handleEditUser=(userId)=>{
  dispatch(getUser(userId)).unwrap()
  .then(() => {
    navigate("/adminPanel/edit-user")
  })
}
const handleDeleteUser = async (userId) => {
  try {
    await dispatch(deleteUser({ _id: userId })).unwrap();
    toast.info("User Successfully Deleted");
    dispatch(getAllUsers(queries));
  } catch (backendError) {
    toast.error(backendError.error);
  }
};

  const [isMobile, setIsMobile] = useState(false);
  const [availableWidth, setAvailableWidth] = useState(window.innerWidth);
  const handleMobileView = useCallback(() => {
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

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleMobileView();
  }, [handleMobileView]);

  return (
    <>
      {isMobile ? (
        <div class="row m-0 mt-5 col-12" id="items">
          {allUsers.length === 0 ? (
            <tr>
              <td colSpan="5">There is No Users To Display.</td>
            </tr>
          ) : (
            allUsers?.map((user, index) => (
              <div class="col-12 text-light user-part" key={index}>
                <button
                  className={
                    user.accountStatus === "Active"
                      ? "table_btn publish_btn Active"
                      : "bg-secondary table_btn text-light"
                  }
                >
                  {user.accountStatus === "Active" ? "Active" : "inactive"}
                </button>
                <h4>Name</h4>
                <p>
                  {user.fName} {user.lName}
                </p>
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
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={()=>handleEditUser(user._id)}
                    className="table-icon"
                    style={{ color: "#bf9b30", cursor:"pointer"}}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDeleteUser(user._id)}
                    className="table-icon"
                    style={{ color: "#bf9b30", cursor:"pointer" }}
                  />
                </div>
              </div>
            ))
          )}
          <Link to="/adminPanel/addUsers">
            <button
              class="btn row_btn col-12 text-light mt-4"
              type="button"
              style={{ background: "#bf9b30" }}
            >
              Create New user
            </button>
          </Link>
        </div>
      ) : (
        <div class="user-sec  ">
          <Link to="/adminPanel/addUsers">
            <button
              className="btn color-yellow ps-4 m-2 d-block pe-4 p-2 ms-auto"
              style={{ border: "1px solid #bf9b30" }}
            >
              {" "}
              Create new user
            </button>
          </Link>
          <div class="article-search d-lg-flex justify-content-lg-between">
            <h4 className="text-light">users</h4>
            <div class="search-div">
              <input
                type="number"
                placeholder="Search by userId"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                style={{ borderRadius: "5px", padding: "5px" }}
              />
              <FontAwesomeIcon
                icon={faSearch}
                onClick={handleSearch}
                style={{ cursor: "pointer" }}
                className="text-warning"
              />
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
                {allUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5">There is No Users To Display.</td>
                  </tr>
                ) : (
                  allUsers?.map((user, index) => (
                    <tr key={index}>
                      <td>{user.firstName}</td>
                      <td>
                        <button
                          className={
                            user.accountStatus === "Active"
                              ? ""
                              : "bg-secondary text-light"
                          }
                        >
                          {user.accountStatus === "Active"
                            ? "Active"
                            : "inActive"}
                        </button>
                      </td>
                      <td>{user.userId}</td>
                      <td>{user.role}</td>
                      <td>
                        <Link href="" style={{cursor:"pointer"}}>
                          <FontAwesomeIcon
                           onClick={()=>handleEditUser(user._id)}
                            icon={faPenToSquare}
                            className="color-yellow"
                          /> 
                        </Link>
                        <span
                        style={{cursor:"pointer"}}
                           onClick={() => handleDeleteUser(user._id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            className="color-yellow"
                          />
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Pagination total={total} pages={pages} currentPage={page} limit={limit} onPageChange={handlePageChange} />
          </div>
        </div>
      )}
    </>
  );
}
export default Users;
