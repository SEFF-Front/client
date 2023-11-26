import './App.css';
import Navbar from './components/navbar/Navbar';
import News from './components/news/news';
import LoginComponent from './components/login/Login';
import Scroll from './components/scroll/scroll';
import { Route, Routes } from 'react-router-dom';
import ShowNews from './components/news/showNew';
import Articles from './components/admin Panel/articles/article';
import AddJob from './components/admin Panel/add job/AddJob';
import AdminPanel from './components/admin Panel/adminPanel';
import CvShape from './components/cv/cv view/cvSahpe';
import Coursedeatels from './components/Coursedeatels/Coursedeatels';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import PersonalPage from './components/welcome/personalPage';
import AddUser from './components/admin Panel/add users/addUser';
import Profile from './components/profile/profile';
import AddArticles from './components/admin Panel/add articles/AddArtciles';
import FindJobs from './components/jobPage studentPortal/findJob';
import Applications from './components/admin Panel/application/application';
import UserStudents from './components/admin Panel/users-students/UsersStudents';
import UserInstructors from './components/admin Panel/users-students/userInstructor';
import UserAdmins from './components/admin Panel/users-students/usersAdmin';
import PublishedArticles from './components/admin Panel/articles/saved';
import DraftArticles from './components/admin Panel/articles/draft';
import Users from './components/admin Panel/users/Users';
import AddCourses from './components/admin Panel/add courses/addCourses';
import Courses from './components/admin Panel/courses/Courses';
import PublishedCourses from './components/admin Panel/courses/saved';
import DraftCourses from './components/admin Panel/courses/draft';
import AddCertificateDetails from './components/admin Panel/add certificate/Add_Certificate_Details';
import { useSelector } from 'react-redux';
import Jobs from './components/admin Panel/jobs/Jobs';
import { Toaster } from 'react-hot-toast';
import { useCookies } from 'react-cookie'
import { useNavigate,useLocation } from 'react-router-dom';
import React, { useEffect ,useState} from 'react';
import { useDispatch } from 'react-redux';
import {currentUser} from "./components/redux/reducers/authSlice"
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [cookies] = useCookies([]);
  let navigate = useNavigate()
  const dispatch =useDispatch()
  const location = useLocation();
  const currentRoute = location.pathname;

  useEffect(() => {
  const handleNavigation = async () => {
    if (currentRoute !== "/articles") {
      // if (!cookies.accessToken && !cookies.refreshToken) {
      //   navigate('/login');
      // } else {
        try {
          await dispatch(currentUser()).unwrap();
        } catch (error) {
          console.error("Error fetching current user:", error);
          navigate('/login');
        }
      }
  // }
    setIsLoading(false); 
  };
  handleNavigation();
}, [cookies.refreshToken, cookies.accessToken, currentRoute, dispatch, navigate])
if (isLoading) {
  return null;
}
    return (
    <>
    <div className="App">
      <Toaster/>
      <Navbar />
      {/* <AdminSideBar/> */}
      {/* <AdminPanel/> */}
      {/* <Jobs/> */}
      {/* <Coursedeatels/> */}
      {/* <CvShape /> */}
      {/* <Articles/> */}
      {/* <AddJob /> */}
      {/* <PersonalPage/> */}
      {/* <AddUser/> */}
    </div>
       <Routes>
       <Route path='/' element={<News/>}/>
       <Route path='/showNews' element={<ShowNews/>}/>
       <Route path='/about' element={<News/>}/>
       <Route path='/business' element={<News/>}/>
       <Route path='/security' element={<News/>}/>
       <Route path='/sports' element={<News/>}/>
       <Route path='/medical' element={<News/>}/>
       <Route path='/startups' element={<News/>}/>
       <Route path='/apps' element={<News/>}/>
       <Route path='/login' element={<LoginComponent/>}/>
       {console.log(user?.role )}
      {isAuthenticated && <Route path='/jobs' element={<FindJobs/>}/>}
      {isAuthenticated && (user?.role === 'Student' || user?.role === 'instructor' || user?.role === 'Admin') && (
      <Route path="/profile" element={<Profile />} />
      )}    
        {isAuthenticated && user?.role === 'Student'&& (<Route path='/createCv' element={<CvShape/>}/>)}
        {isAuthenticated && user?.role === 'Student'&& (<Route path='/StudentPanel/coursedetails' element={<Coursedeatels />}/>)}
        
        {isAuthenticated && user?.role === 'Student' &&(<Route path='/StudentPanel' element={<PersonalPage/>}/>)}
        {isAuthenticated &&user?.role === 'instructor' &&<Route path='/instructorPanel' element={<PersonalPage/>}/>}

        {isAuthenticated &&user?.role === 'Admin' && (
              <Route path='/adminPanel' element={<AdminPanel/>}>
              <Route path="articles" element={<Articles />} />
              <Route
                path="addarticles"
                element={<AddArticles />}
              />
              <Route path="Jobbs" element={<Jobs />} />
              <Route path="publishedarticles" element={<PublishedArticles />} />
              <Route path="draftarticles" element={<DraftArticles />} />
              <Route path="addjobs" element={<AddJob />} />
              <Route
                path="addcertificate"
                element={<AddCertificateDetails />}
              />
              <Route path="courses" element={<Courses />} />
              <Route path="publishedcourses" element={<PublishedCourses />} />
              
              <Route path="draftcourses" element={<DraftCourses />} />
              <Route path="addcourses" element={<AddCourses />} />
              <Route path="users" element={<Users />} />
              <Route path="addusers" element={<AddUser />} />
              <Route path="application" element={<Applications />} />
              <Route
                path="userstudents"
                element={<UserStudents />}
              />
              <Route
                path="userAdmins"
                element={<UserAdmins />}
              />
              <Route
                path="userInstructors"
                element={<UserInstructors />}
              />

        </Route>
        )}

       
    <Route path='*' element={<News/>} />
      </Routes>
      <Scroll />
      </>
  );
}

export default App;