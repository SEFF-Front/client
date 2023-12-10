import './personalPage.css';
import img from '../../assest/oooo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckCircle,
	// faCalendarAlt,
	// faFileAlt,
	// faPenToSquare,
	// faUser,
} from '@fortawesome/free-solid-svg-icons';
import Footer from '../footer/Footer';
import Title from '../title/title';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCourses } from '../redux/reducers/CourseSlice';
import moment from 'moment';
import { domainBack } from '../../utils/Api';
import { fetchCertificates } from '../redux/reducers/certificateSlice';
import { fetchExams } from '../redux/reducers/examSlice';
function Personal() {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { courses } = useSelector((state) => state.courses);
	const { exams } = useSelector((state) => state.exams);
	const { certificates, loading } = useSelector((state) => state.certificates);

	useEffect(() => {
		dispatch(
			fetchCourses({
				role: 'student',
				// query: { fieldName: 'student', fieldValue: user?._id, limit: 100 },
				// query: { filter: { student: user?._id, isPublished: true } },
			})
		);

		dispatch(fetchCertificates({ role: 'student' }));
		dispatch(fetchExams());
	}, []);

	const [upComingExams, setUpComingExams] = useState([]);

	useEffect(() => {
		setUpComingExams(
			exams?.filter(
				(ele) => ele?.status?.includes('coming') || new Date(ele?.date) > Date.now()
			)
		);
	}, [exams]);

	return (
		<>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, maximum-scale=1"
			/>
			<div class="exams m-3 container mx-auto">
				<div className="container mx-auto ">
					<Title title={'student Portal'} />
				</div>

				<div class="exams-container position-relative mt-3 ">
					<div className="d-flex justify-content-between container mb-5">
						<div className="fs-2 " style={{ fontWeight: '700' }}>
							<span class=" text-uppercase text-white">welcome back </span>
							<span class="text-uppercase" style={{ color: '#bf9b30' }}>
								{`${user?.firstName || ''} ${user?.lastName || ''}`}
							</span>
						</div>

						<Link to={'/profile'} class="text-white btn btn text-uppercase  view ">
							<button
								class="navbar-toggler p-0 m-0"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#main"
								aria-controls="main"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								VIEW PROFILE
							</button>
						</Link>
					</div>

					<div class="course container p-3 px-1 px-sm-5 flex-wrap  justify-content-between  align-items-center  d-flex text-uppercase">
						<h3 class="text-white  fs-5  col-xs-12 mb-0">
							<span
								class="badge p-4 me-2  text-white text-uppercase"
								style={{ border: ' 1px solid #bf9b30', fontSize: '23px' }}
							>
								{/* exams------------------- */}
								{upComingExams?.length || 0}
							</span>
							upcoming exams
						</h3>

						<h3 class="text-white  fs-5  col-xs-12 mb-0">
							<span
								class="badge p-4 me-2  text-white text-uppercase "
								style={{ border: ' 1px solid #bf9b30', fontSize: ' 23px' }}
							>
								{courses?.filter((ele) => ele?.status?.includes('going'))
									?.length || 0}
							</span>
							ongoing courses
						</h3>

						<h3 class="text-white  fs-5  col-xs-12 mb-0">
							{' '}
							<span
								class="badge p-4 me-2  text-white text-uppercase "
								style={{ border: ' 1px solid #bf9b30', fontSize: ' 23px' }}
							>
								{courses?.filter((ele) => ele?.status?.includes('ended'))
									?.length || 0}
							</span>
							completed courses
						</h3>
					</div>
				</div>
			</div>

			<div className="container mx-auto">
				<h5
					className="p-3 px-5 container  done text-light rounded text-uppercase"
					style={{ maxWidth: 'fit-content', marginLeft: '0' }}
				>
					<FontAwesomeIcon icon={faCheckCircle} className="text-light me-3" />
					All clear, you don't have any exams today
				</h5>
			</div>

			<div class="row text-light mt-5 container mx-auto justify-content-between">
				<div class="col-xs-12 col-md-5 mb-3">
					<h2 style={{ fontWeight: '700' }}>Registered Courses</h2>
					<div class="d-flex flex-column">
						{courses?.length < 1 ? (
							<h5>No Registered Courses right now!</h5>
						) : (
							courses?.map((ele) => (
								<div class="course mt-3 p-4">
									<h6 style={{ fontWeight: '700' }} className="mb-1">
										{ele?.name || ''}
									</h6>
									<div>
										<span class="course_coler" style={{ fontWeight: '700' }}>
											Instructor:
										</span>
										<span>
											{` ${ele?.Instructor?.firstName || ''} ${
												ele?.Instructor?.lastName || ''
											}`}
										</span>
									</div>
									<div class="d-flex justify-content-between mt-4">
										<div class="" style={{ fontWeight: '700' }}>
											LEV.{ele?.level || ''}
										</div>
										<Link
											to={`/StudentPanel/coursedetails/${ele?._id}`}
											className=""
										>
											<button class="rounded border-0 course_button text-light px-3 py-1 font-weight-bold">
												VIEW DETAILS
											</button>
										</Link>
									</div>
								</div>
							))
						)}
					</div>
				</div>

				<div class="col-xs-12 col-md-5">
					<div class="row">
						<h2 style={{ fontWeight: '700' }} className="col-md-8 ">
							Upcoming Exams
						</h2>
					</div>
					<div className="d-flex flex-column gap-2">
						{upComingExams?.length < 1 ? (
							<h5>No Upcoming Exams!</h5>
						) : (
							exams?.map((ele) => (
								<div class="row mt-3 course p-2" key={ele?._id}>
									<div class="col-3 text-center">
										<div class="d-flex flex-column justify-content-center mt-2  ">
											<span
												class=" rounded-top color_black bg-dark"
												style={{ fontWeight: '700' }}
											>
												{moment(ele?.date).format('Do')}
											</span>
											<span class=" color_black bg-dark">
												{moment(ele?.date).format('MMM')}
											</span>
											<span class=" rounded-bottom color_orange ">
												{moment(ele?.date).format('ddd')}
											</span>
										</div>
									</div>
									<div class="col-9 ">
										<div class="d-flex flex-row justify-content-between">
											<h6 style={{ fontWeight: '700' }} className="mb-0">
												{ele?.course?.name || ''}
											</h6>
										</div>
										<div className="mb-4">
											<span class="course_coler" style={{ fontWeight: '700' }}>
												Instructor :
											</span>
											<span class="text-light">
												{` ${ele?.Instructor?.firstName || ''} ${
													ele?.Instructor?.lastName || ''
												}`}
											</span>
										</div>
										<div class="d-flex flex-row justify-content-between pt-1">
											<h6 style={{ fontWeight: '700' }}>Lev.1 Exam</h6>
											<span>
												<FontAwesomeIcon
													icon={faClock}
													style={{ color: 'grey' }}
												/>
												{moment(ele?.date).format(' hh:mm A')}
											</span>
										</div>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>
			<div class="mb-3 mt-5 container  text-light">
				<h4 style={{ fontWeight: '700' }} className="my-4">
					Earned Certificates
				</h4>
				<div class="d-flex flex-column gap-2">
					{certificates?.map((ele) => (
						<div className="d-flex course justify-content-between align-items-center p-3">
							<div className="">
								<h5 style={{ fontWeight: '700' }}>{ele?.course?.name || ''}</h5>
								<span>
									<span class="course_coler" style={{ fontWeight: '700' }}>
										Instructor:
									</span>
									<span>{` ${ele?.course?.Instructor?.firstName || ''} ${
										ele?.course?.Instructor?.lastName || ''
									}`}</span>
								</span>
								<span className="ms-sm-0 ms-md-3 d-m-block">
									<span class="course_coler" style={{ fontWeight: '700' }}>
										Date Acquired: &#160;
									</span>
									<span>{moment(ele?.date).format('dddd, MMMM Do')}</span>
								</span>
							</div>
							<div className="d-flex h-50">
								<Link
									hr={
										ele?.certificate_file && domainBack + ele?.certificate_file
									}
									download
									className="rounded border-0 course_button text-light px-4 py-2 font-weight-bold"
								>
									Download
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>

			<Footer />
		</>
	);
}
export default Personal;
