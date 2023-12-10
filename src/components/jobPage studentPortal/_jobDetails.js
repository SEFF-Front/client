import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
	faClock,
	faCloudArrowUp,
	faFilter,
	faLocationDot,
	faMagnifyingGlass,
	faMapMarkedAlt,
} from '@fortawesome/free-solid-svg-icons';
import './Jobsstyle.css';
import Title from '../title/title';
import Dragdrop from '../Drag drop/Dragdrop';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../footer/Footer';
import { createApplication } from '../redux/reducers/ApplicationSlice';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { fetchAllJobs, fetchOneJob } from '../redux/reducers/JobSlice.';
import moment from 'moment';
import JobListHeader from './jobListHeader';

function JobsListMain() {
	// ------------------------------ server ---------------------------
	const {jobId} = useParams()
	const dispatch = useDispatch();
	const { all: jobs, job, loading } = useSelector((state) => state.jobs);

	useEffect(() => {
		// dispatch(fetchAllJobs());
		dispatch(fetchOneJob(jobId));
	}, [jobId, dispatch]);

	// ------------------------------ server ---------------------------

	var jobData = jobs;
	var [location, setLocation] = useState('');
	var [jobType, setJobType] = useState([]);
	var [jobLevel, setjobLevel] = useState([]);
	var [salaryRange, setSalaryRange] = useState([]);
	var [details, setDetails] = useState(false);
	var [form, setForm] = useState(false);
	var [search, setSearch] = useState('');
	var [clicked, setClicked] = useState(false);
	var [menu, setMenu] = useState(false);
	var [file, setFile] = useState(null);
	var [currentJob, setCurrentJob] = useState({});
	var selectRef = useRef(null);
	const inputRef = React.useRef(null);
	const [dragActive, setDragActive] = React.useState(false);
	const handleDrag = function (e) {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	};
	const [formData, setFormData] = useState([
		{
			email: '',
			experience: '',
			mobNum: '',
			uploadedFile: null,
		},
	]);
	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormData({ ...formData, [id]: value });
	};

	const handleFileDrop = (droppedFile) => {
		setFormData({ ...formData, uploadedFile: droppedFile });
	};
	const handleSubmit = () => {
		dispatch(createApplication(formData));
	};

	const onButtonClick = () => {
		inputRef.current.click();
	};
	var handleClear = () => {
		const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
		checkboxes.forEach((checkbox) => (checkbox.checked = false));
		setLocation('');
		setJobType('');
		setjobLevel('');
		setSalaryRange('');
		selectRef.current.value = '';
	};
	var handleDetails = (id) => {
		setDetails(true);
		var job = jobs.find((el) => el.id == id);
		setCurrentJob(job);
	};
	var data = jobData;
	if (search && clicked) {
		data = data.filter((el) => el?.title?.includes(search));
	}
	if (location) {
		data = data.filter((el) => el?.location?.includes(location));
	}
	if (jobType?.length > 0) {
		var arr = [];
		for (let item of jobType) {
			for (let el of data) {
				if (el?.jobType?.includes(item)) {
					arr.push(el);
				}
			}
		}
		data = arr;
	}
	if (jobLevel?.length > 0) {
		var arr = [];
		for (let item of jobLevel) {
			for (let el of data) {
				if (el?.jobLevel?.includes(item)) {
					arr.push(el);
				}
			}
		}
		data = arr;
	}
	if (salaryRange?.length > 0) {
		var arr = [];
		for (let item of salaryRange) {
			for (let el of data) {
				var tot;
				if (el.salary < 4000) {
					tot = '4000';
				} else if (el.salary >= 4000 && el.salary <= 10000) {
					tot = '4000-10000';
				} else {
					tot = '10000';
				}
				if (tot == item) {
					arr.push(el);
				}
			}
		}
		data = arr;
	}
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(2);
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(data?.length / recordsPerPage);
	const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
	const nextPage = () => {
		if (currentPage !== nPages) setCurrentPage(currentPage + 1);
	};

	const prevPage = () => {
		if (currentPage !== 1) setCurrentPage(currentPage - 1);
	};
	jobData = currentRecords;
	return (
		<>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1"
			/>
			<div className="body">
				<div className="position-relative">
					<div class="container">
						<div class="date  mt-5 mb-4">
							<div class="info-header">
								<Title title={'Find Job'} />
							</div>
						</div>
					</div>
					<div class="d-flex container mb-5 justify-content-between head">
						<div class="jobLooking col-12">
							<h1>Looking for a job ?</h1>
							<p>
								Here you can find your best match between 1000s of updated and
								available positions
							</p>
						</div>
						{/* search input ------------------------------- */}
						<div class="searchBox justify-content-end">
							<span className="position-relative">
								<FontAwesomeIcon
									className="icon position-absolute"
									icon={faMagnifyingGlass}
								/>
								<input
									placeholder="Search for a job"
									onChange={(e) => {
										setSearch(e.target.value);
										setClicked(false);
									}}
								></input>
								<button type="button" onClick={() => setClicked(true)}>
									SEARCH
								</button>
								<button type="button" id="menu" onClick={() => setMenu(!menu)}>
									<FontAwesomeIcon icon={faFilter} />
								</button>
							</span>
						</div>
					</div>

					<div class="container filter-side d-flex bd-highlight p-0">
						<div className={menu ? 'filter' : 'filter display-none'}>
							{/* sidebar filter ----------------------------------------- */}
							<aside class="job-filter pb-5">
								<div class="filter-head d-flex  p-2 align-items-baseline rounded">
									<h2 class="text-white mr-5 fs-5">Filters</h2>
									<button
										id="clear-filter"
										class="btn filter-btn"
										onClick={handleClear}
									>
										Clear All
									</button>
								</div>
								<div class="p-4">
									<div class="filter-item">
										<label for="location" class="text-white">
											Location:
										</label>
										<select
											id="location"
											class="form-select  text-light border-0"
											ref={selectRef}
											onChange={(e) => setLocation(e.target.value)}
										>
											<option value="">All</option>
											<option value="New York">New York</option>
											<option value="San Francisco">San Francisco</option>
										</select>
									</div>
									<div class="filter-item">
										<label class="text-white">Job Type:</label>
										<div class="form-check">
											<input
												type="checkbox"
												id="full-time"
												class="form-check-input"
												name="jobType"
												value="Full-time"
												onChange={(e) => {
													e.target.checked
														? setJobType([...jobType, e.target.value])
														: setJobType(
																jobType.filter(
																	(item) => item !== e.target.value
																)
														  );
												}}
											/>
											<label
												for="full-time"
												class="form-check-label text-white"
											>
												Full-time
											</label>
										</div>
										<div class="form-check">
											<input
												type="checkbox"
												id="part-time"
												class="form-check-input"
												name="jobType"
												value="Part-time"
												onChange={(e) => {
													e.target.checked
														? setJobType([...jobType, e.target.value])
														: setJobType(
																jobType.filter(
																	(item) => item !== e.target.value
																)
														  );
												}}
											/>
											<label
												for="part-time"
												class="form-check-label text-white"
											>
												Part-time
											</label>
										</div>
										<div class="form-check">
											<input
												type="checkbox"
												id="remote"
												class="form-check-input"
												name="jobType"
												value="Remote"
												onChange={(e) => {
													e.target.checked
														? setJobType([...jobType, e.target.value])
														: setJobType(
																jobType.filter(
																	(item) => item !== e.target.value
																)
														  );
												}}
											/>
											<label for="remote" class="form-check-label text-white">
												Remote
											</label>
										</div>
									</div>
									<div class="filter-item">
										<label class="text-white">Job Level:</label>
										<div class="form-check">
											<input
												type="checkbox"
												id="entry-level"
												class="form-check-input"
												name="jobLevel"
												value="Entry-level"
												onChange={(e) => {
													e.target.checked
														? setjobLevel([...jobLevel, e.target.value])
														: setjobLevel(
																jobLevel.filter(
																	(item) => item !== e.target.value
																)
														  );
												}}
											/>
											<label
												for="entry-level"
												class="form-check-label text-white"
											>
												Entry Level
											</label>
										</div>
										<div class="form-check">
											<input
												type="checkbox"
												id="intermediate"
												class="form-check-input"
												name="jobLevel"
												value="Intermediate"
												onChange={(e) => {
													e.target.checked
														? setjobLevel([...jobLevel, e.target.value])
														: setjobLevel(
																jobLevel.filter(
																	(item) => item !== e.target.value
																)
														  );
												}}
											/>
											<label
												for="intermediate"
												class="form-check-label text-white"
											>
												Intermediate
											</label>
										</div>
										<div class="form-check">
											<input
												type="checkbox"
												id="expert"
												class="form-check-input"
												name="jobLevel"
												value="Expert"
												onChange={(e) => {
													e.target.checked
														? setjobLevel([...jobLevel, e.target.value])
														: setjobLevel(
																jobLevel.filter(
																	(item) => item !== e.target.value
																)
														  );
												}}
											/>
											<label class="form-check-label text-white">Expert</label>
										</div>
									</div>
									<div class="filter-item">
										<label class="text-white">Salary Range:</label>
										<div class="form-check">
											<input
												type="checkbox"
												id="salary-1"
												class="form-check-input"
												name="salaryRange"
												value="4000"
												onChange={(e) => {
													e.target.checked
														? setSalaryRange([
																...salaryRange,
																e.target.value,
														  ])
														: setSalaryRange(
																salaryRange.filter(
																	(item) => item !== e.target.value
																)
														  );
												}}
											/>
											<label
												for="salary-1"
												class="form-check-label text-white"
											>
												Less than $4000
											</label>
										</div>
										<div class="form-check">
											<input
												type="checkbox"
												id="salary-2"
												class="form-check-input"
												name="salaryRange"
												value="4000-10000"
												onChange={(e) => {
													e.target.checked
														? setSalaryRange([
																...salaryRange,
																e.target.value,
														  ])
														: setSalaryRange(
																salaryRange.filter(
																	(item) => item !== e.target.value
																)
														  );
												}}
											/>
											<label
												for="salary-2"
												class="form-check-label text-white"
											>
												$4000 - $10000
											</label>
										</div>
										<div class="form-check">
											<input
												type="checkbox"
												id="salary-3"
												class="form-check-input"
												name="salaryRange"
												value="10000"
												onChange={(e) => {
													e.target.checked
														? setSalaryRange([
																...salaryRange,
																e.target.value,
														  ])
														: setSalaryRange(
																salaryRange.filter(
																	(item) => item !== e.target.value
																)
														  );
												}}
											/>
											<label
												for="salary-3"
												class="form-check-label text-white"
											>
												More than $10000
											</label>
										</div>
									</div>
								</div>
							</aside>
							<div class="mt-4">
								<button class="btn cv-btn text-light">CREATE YOUR CV</button>
							</div>
						</div>

						<div class="pl-3 flex-grow-1">
							{/* <Outlet context={[jobData]} /> */}
							<JobListHeader type="details" job={job} />
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
export default JobsListMain;
