import './App.css';
import Navbar from './components/navbar/Navbar';
// import News from './components/news/news';
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
import EditUser from './components/admin Panel/edit users/editUser';
import Profile from './components/profile/profile';
import AddArticles from './components/admin Panel/add articles/AddArtciles';
import Applications from './components/admin Panel/application/application';
import UserStudents from './components/admin Panel/users-students/UsersStudents';
import UserInstructors from './components/admin Panel/users-students/userInstructor';
import UserAdmins from './components/admin Panel/users-students/usersAdmin';
import PublishedArticles from './components/admin Panel/articles/saved';
import DraftArticles from './components/admin Panel/articles/draft';
import Users from './components/admin Panel/users/Users';
import AddCourses from './components/admin Panel/add courses/addCourses';
import Courses from './components/admin Panel/courses/Courses';
import AddCertificateDetails from './components/admin Panel/add certificate/Add_Certificate_Details';
import { useSelector } from 'react-redux';
import Jobs from './components/admin Panel/jobs/Jobs';
import { Toaster } from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { currentUser } from './components/redux/reducers/authSlice';
import Personal from './components/welcome/personal';
import Addexam from './components/admin Panel/add exam/addexam';
import UpdateJob from './components/admin Panel/update job/UpdateJob';
import JobsListMain from './components/jobPage studentPortal/jobsListMain';
import UpdateArticle from './components/admin Panel/update article/UpdateAricle';
// import AboutNews from './components/news/aboutNews';
import BusinessNews from './components/news/businessNews';
import MedicalNews from './components/news/medicalNews';
import SecurityNews from './components/news/securityNews';
import SportsNews from './components/news/sportsNews';
import StartupsNews from './components/news/startupsNews';
import TechNews from './components/news/techNews';
import HomeNews from './components/news/homeNews';
import AppsNews from './components/news/appsNews';
import PublishedJobs from './components/admin Panel/jobs/published';
import DraftJobs from './components/admin Panel/jobs/draft';

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const { user, isAuthenticated } = useSelector((state) => state.user);
	const [cookies] = useCookies([]);
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const currentRoute = location.pathname;

	useEffect(() => {
		const handleNavigation = async () => {
			if (currentRoute !== '/articles') {
				// if (!cookies.accessToken && !cookies.refreshToken) {
				//   navigate('/login');
				// } else {
				try {
					await dispatch(currentUser()).unwrap();
				} catch (error) {
					console.error('Error fetching current user:', error);
					navigate('/login');
				}
			}

			setIsLoading(false);
		};
		handleNavigation();
	}, [cookies.refreshToken, cookies.accessToken, currentRoute, dispatch, navigate]);

	if (isLoading) {
		return null;
	}

	return (
		<>
			<div className="App">
				<Toaster />
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
				<Route path="/" element={<HomeNews />} />
				<Route path="/business" element={<BusinessNews />} />
				<Route path="/security" element={<SecurityNews />} />
				<Route path="/sports" element={<SportsNews />} />
				<Route path="/medical" element={<MedicalNews />} />
				<Route path="/startups" element={<StartupsNews />} />
				<Route path="/apps" element={<AppsNews />} />
				<Route path="/tech" element={<TechNews />} />
				<Route path="/articles/:articleId" element={<ShowNews />} />

				<Route path="/login" element={<LoginComponent />} />
				{isAuthenticated &&
					(user?.role === 'Student' ||
						user?.role === 'Instructor' ||
						user?.role === 'Admin') && (
						<Route path="/profile" element={<Profile />} />
					)}
				{isAuthenticated && user?.role === 'Student' && (
					<Route path="/createCv" element={<CvShape />} />
				)}
				{isAuthenticated && user?.role === 'Student' && (
					<Route
						path="/StudentPanel/coursedetails/:courseId"
						element={<Coursedeatels />}
					/>
				)}

				{isAuthenticated && user?.role === 'Student' && (
					<Route path="/StudentPanel" element={<Personal />} />
				)}
				{isAuthenticated && user?.role === 'Instructor' && (
					<Route path="/instructorPanel" element={<PersonalPage />} />
				)}
				{isAuthenticated && user?.role === 'Instructor' && (
					<>
						<Route
							path="/instructorPanel/coursedetails/:courseId"
							element={<Coursedeatels />}
						/>
						<Route path="/instructorPanel/addexam" element={<Addexam />} />
						<Route
							path="/instructorPanel/editexam/:examId"
							element={<Addexam type="edit" />}
						/>
					</>
				)}
				{isAuthenticated && user?.role === 'Admin' && (
					<Route path="/adminPanel" element={<AdminPanel />}>
						<Route path="articles" element={<Articles />} />
						<Route path="addarticles" element={<AddArticles />} />
						<Route path="updatearticle" element={<UpdateArticle />} />
						<Route path="updatejob" element={<UpdateJob />} />

						<Route path="Jobbs" element={<Jobs />} />
						<Route path="Jobbs-published" element={<PublishedJobs />} />
						<Route path="jobbs-drafts" element={<DraftJobs />} />
						<Route
							path="/adminPanel/jobbs/:jobId/applications"
							element={<Applications />}
						/>
						<Route path="publishedarticles" element={<PublishedArticles />} />
						<Route path="scheduledarticles" element={<PublishedArticles />} />
						<Route path="draftarticles" element={<DraftArticles />} />
						<Route path="addjobs" element={<AddJob />} />
						<Route path="addcertificate" element={<AddCertificateDetails />} />

						<Route path="courses" element={<Courses />} />
						<Route path="courses/:courseId" element={<AddCourses type="edit" />} />
						<Route path="addcourses" element={<AddCourses type="new" />} />
						<Route
							path="courses/publishedcourses"
							element={<Courses StatusQuery="published" />}
						/>
						<Route
							path="courses/scheduledcourses"
							element={<Courses StatusQuery="scheduled" />}
						/>
						<Route
							path="courses/draftcourses"
							element={<Courses StatusQuery="draft" />}
						/>

						<Route path="users" element={<Users />} />
						<Route path="addusers" element={<AddUser />} />
						<Route path="edit-user" element={<EditUser />} />
						<Route path="application" element={<Applications />} />
						<Route path="userstudents" element={<UserStudents />} />
						<Route path="userAdmins" element={<UserAdmins />} />
						<Route path="userInstructors" element={<UserInstructors />} />
					</Route>
				)}

				{isAuthenticated && (
					<>
						<Route path="/jobs" element={<JobsListMain />} />
						<Route path="/jobs/:jobId" element={<JobsListMain />} />
						<Route path="/jobs/:jobId/add-application" element={<JobsListMain />} />
					</>
				)}

				<Route path="*" element={<HomeNews />} />
			</Routes>
			<Scroll />
		</>
	);
}

export default App;
