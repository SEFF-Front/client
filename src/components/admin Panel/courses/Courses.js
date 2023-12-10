import {
	faEdit,
	faPenToSquare,
	faSearch,
	faTrash,
	faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { deleteCourse, fetchCourses } from '../../redux/reducers/CourseSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Pagination from '../../pagination/pagination';

function Courses({ StatusQuery }) {
	// ------------------------- server --------------------------
	const location = useLocation();
	const dispatch = useDispatch();
	const { courses, loading, pagination } = useSelector((state) => state.courses);
	const { total, limit, page, pages } = pagination;

	// pagination -----------------------------------
	// const [queries, setQueries] = useState({
	// 	searchBy: 'name',
	// 	searchValue: '',
	// });

	// const [searchParams, setSearchParams] = useSearchParams();
	// console.log('searchParams', searchParams);

	const handlePageChange = (page) => {
		setFilters((prev) => ({ ...prev, page }));
		// setQueries((prevQueries) => ({ ...prevQueries, page }));
		// setSearchParams({ searchValue: search, page });
	};

	const [search, setSearch] = useState('');

	const handelSearchInput = (e) => {
		setSearch(e.target.value);
		// setQueries((prev) => ({ ...prev, page: 1, searchValue: search }));
	};
	// const handleSearch = (e) => {
	// 	setQueries((prev) => ({ ...prev, page: 1, searchValue: search }));
	// 	// setSearchParams({ searchValue: search, page: 1 });
	// };

	useEffect(() => {
		setSearch('');
	}, [location.pathname]);

	const [filter, setFilter] = useState({});
	useEffect(() => {
		if (!StatusQuery) {
			setFilter({ isPublished: true, status: ['ended', 'on going'] });
		} else if (StatusQuery === 'published') {
			setFilter({ isPublished: true });
		} else if (StatusQuery === 'scheduled') {
			// setFilter({ isPublished: true, status: { $regex: new RegExp('up coming', 'i')  }});
			setFilter({ isPublished: true, status: 'up coming' });
		} else if (StatusQuery === 'draft') {
			setFilter({ isPublished: false });
		}
	}, [StatusQuery]);

	const [filters, setFilters] = useState({});

	useEffect(() => {
		setFilters({ role: 'admin', filter, page: 1 });

		if (search) {
			setFilters({
				role: 'admin',
				filter: {...filter,  name: { $regex: search, $options: 'i' } },
				page: 1,
			});
		}
	}, [filter, search]);

	useEffect(() => {
		dispatch(fetchCourses(filters));
	}, [filters, dispatch]);

	const handelDeleteCourse = async (id) => {
		await dispatch(deleteCourse(id)).then(() => {
			dispatch(fetchCourses(filters));
		});
	};
	// ------------------------- server --------------------------

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

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		handleMobileView();
	}, [handleMobileView]);

	return (
		<>
			{isMobile ? (
				<div class="row m-0 mt-5 col-12" id="items">
					{courses?.length < 1 ? (
						<h6 className="text-light">There is no item to display</h6>
					) : (
						courses?.map((course, index) => (
							<div class="col-12 text-light  user-part" key={index} id="item">
								<button
									className={
										course.status
											? 'table_btn publish_btn Active'
											: ' Active bg-secondary table_btn text-light'
									}
								>
									{course?.status}
								</button>
								<h4>Title</h4>
								<p>{course?.name || ''}</p>
								<div class="d-flex flex-wrap  justify-content-between">
									<div className="w-50">
										<h4>level</h4>
										<p>{course?.level}</p>
									</div>
									<div className="w-50">
										<h4>num Of Lessons</h4> <p>{course?.lessons}</p>
									</div>
									<div className="w-50">
										<h4>language</h4> <p>{course?.language}</p>
									</div>
									<div className="w-50">
										<h4>start Date</h4>
										<p>{moment(course?.start_date).format('dddd, MMMM Do')}</p>
									</div>
									<div className="w-50">
										<h4>duration</h4> <p>{course?.duration}</p>
									</div>
									<div className="w-50">
										<h4>publishing Date</h4>
										<p>
											{moment(course?.publish_date).format('dddd, MMMM Do ')}
											<br />
											{moment(course?.publish_date).format('hh:mm A')}
										</p>
									</div>
								</div>
								<div class="icons2 d-flex justify-content-end gap-2">
									<Link to={`/adminPanel/courses/${course?._id}`}>
										<FontAwesomeIcon
											icon={faEdit}
											className="table-icon"
											color="#bf9b30"
										/>
									</Link>
									<FontAwesomeIcon
										icon={faTrash}
										onClick={() => handelDeleteCourse(course?._id)}
										className="table-icon"
										color="#bf9b30"
									/>
								</div>
							</div>
						))
					)}
					<Link to="/adminPanel/addCourses">
						<button
							className="btn col-12 ps-4 m-2 d-block pe-4 p-2 ms-auto text-light"
							style={{ background: '#bf9b30' }}
						>
							{' '}
							Create new course
						</button>
					</Link>
				</div>
			) : (
				<div class="article-sec">
					<Link to="/adminPanel/addCourses">
						<button
							className="btn color-yellow ps-4 m-2 d-block pe-4 p-2 ms-auto"
							style={{ border: '1px solid #bf9b30' }}
						>
							{' '}
							Create new course
						</button>
					</Link>
					<div class="article-search d-lg-flex justify-content-lg-between">
						<h4 className="text-light">Courses</h4>
						<div class="search-div">
							<input
								type="text"
								placeholder="Search For course"
								// onChange={handelSearchInput}
								onInput={handelSearchInput}
								style={{ borderRadius: '5px', padding: '5px' }}
							/>
							<FontAwesomeIcon
								icon={faSearch}
								className="text-warning"
								onClick={handelSearchInput}
							/>
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
							{courses?.length < 1 ? (
								<tr>
									<td colSpan={7} class="text-center">
										There is no item to display
									</td>
								</tr>
							) : (
								courses?.map((course, index) => (
									<tr key={index}>
										<td>{course?.name || ''}</td>
										<td>
											<button
												className={
													course?.status === 'ended'
														? 'bg-secondary text-light text-capitalize'
														: 'text-capitalize'
												}
											>
												{course?.status}
											</button>
										</td>
										<td>{`${course.Instructor?.firstName} ${course.Instructor?.lastName}`}</td>
										<td>{course.level}</td>
										<td>
											{moment(course?.start_date).format('dddd, MMMM Do')}
										</td>
										<td>
											{moment(course?.publish_date).format('dddd, MMMM Do')}
											<br />
											{moment(course?.publish_date).format('hh:mm A')}
										</td>
										<td>
											<Link to={`/adminPanel/courses/${course?._id}`}>
												<FontAwesomeIcon
													icon={faPenToSquare}
													className="color-yellow"
												/>
											</Link>
											<Link onClick={() => handelDeleteCourse(course?._id)}>
												<FontAwesomeIcon
													icon={faTrashCan}
													className="color-yellow"
												/>
											</Link>
										</td>
									</tr>
								))
							)}
						</table>
						{courses?.length > 0 && (
							<Pagination
								total={total}
								pages={pages}
								currentPage={page}
								limit={limit}
								onPageChange={handlePageChange}
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
}
export default React.memo(Courses);
