import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Title from "../title/title";
import AddCertificateDetails from "./add certificate/Add_Certificate_Details";
import Articles from "./articles/article";
import AdminSideBar from "./sidebar/adminSidebar";
import Jobs from "./jobs/Jobs";
import Courses from "./courses/Courses";
import UserStudents from "./users-students/UsersStudents";
import Users from "./users/Users";
import Footer from "../footer/Footer";
import AddJob from "./add job/AddJob";
import AddCourses from "./add courses/addCourses";
import AddArticles from "./add articles/AddArtciles";
import Applications from "./application/application";
import AddUser from "./add users/addUser";

function AdminPanel() {
  return (
    <><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1"/>
    <div style={{minHeight:"100vh"}}>
      <div className="container text-start w-100 d-block me-auto">
        <Title title={"Admin Panel"} />
      </div>
      <div className="container-lg d-flex  flex-md-column flex-lg-row gap-3 flex-wrap flex-md-nowrap w-100 mt-5">
        <div className="col-lg-3 col-xs-12 flex-shrink-0 centered">
          <AdminSideBar />
        </div>
        <div className="col-lg-9 col-xs-12 centered">
          
          {/* <AddJob/> */}
          {/* <AddCourses/> */}
          {/* <AddArticles/> */}
          {/* <Applications/> */}
          {/* <AddUser/> */}
          <Outlet/>
        </div>
      </div>
      <Footer />
      </div>
    </>
  );
}

export default AdminPanel;