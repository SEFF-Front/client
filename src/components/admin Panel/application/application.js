import { useCallback, useEffect, useState } from 'react';
import './application.css';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApplications } from '../../redux/reducers/ApplicationSlice';
import { Link, useLocation } from 'react-router-dom';
import Pagination from '../../pagination/pagination';
import { domainBack } from '../../../utils/Api';

function Applications() {
	//   ---------------------------------- server ---------------------
	const dispatch = useDispatch();
	const location = useLocation();
	const { applications, loading, pagination } = useSelector(
		(state) => state.applications
	);
	const { job } = useSelector((state) => state.jobs);

	const { total, limit, page, pages } = pagination;

	// pagination -----------------------------------
	const [queries, setQueries] = useState({
		searchBy: 'name',
		searchValue: '',
	});

	// const [searchParams, setSearchParams] = useSearchParams();
	// console.log('searchParams', searchParams);

	const handlePageChange = (page) => {
		setQueries((prevQueries) => ({ ...prevQueries, page }));
		// setSearchParams({ searchValue: search, page });
	};

	const [search, setSearch] = useState('');

	const handelSearchInput = (e) => {
		setSearch(e.target.value);
		setQueries((prev) => ({ ...prev, page: 1, searchValue: search }));
	};
	const handleSearch = (e) => {
		setQueries((prev) => ({ ...prev, page: 1, searchValue: search }));
		// setSearchParams({ searchValue: search, page: 1 });
	};

	useEffect(() => {
		setQueries((prev) => ({ ...prev, searchValue: '' }));
	}, [location.pathname]);

	useEffect(() => {
		dispatch(
			fetchApplications({ filter: { job: location?.state?._id }, ...queries, page: 1 })
		);
	}, [dispatch, queries]);

	useEffect(() => {
		setSearch('');
		setQueries((prev) => ({ ...prev, searchValue: '' }));
	}, [location, dispatch]);

	//   ---------------------------------- server ---------------------

	const [isMobile, setIsMobile] = useState(false);
	const [availableWidth, setAvailableWidth] = useState(window.innerWidth);
	const handleMobileView = useCallback(() => {
		console.log(availableWidth, isMobile);
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
				<div class="row m-0 mt-1 col-12" id="items">
					<h2 className="text-light my-4">
						Applications for "job" at "company name" Applications for "job" at
						"company name"
						{location?.state?.position || ''}
						{location?.state?.companyName || ''}
					</h2>
					{applications?.length < 1 ? (
						<h6 className="text-center">
							There is no Applications for this job yet!
						</h6>
					) : (
						applications?.map((applicant, index) => (
							<div class="col-12 text-light  user-part p-3" key={index} id="item">
								<h4>Applicant</h4>
								<p>{applicant?.title || ''}</p>
								<div class="d-flex  gap-2 row">
									<div className="col-5">
										<h4>Experience</h4>
										<p>
											{applicant?.exp || ''}
											{applicant?.exp > 1 ? ' years' : ' year'}
										</p>
									</div>
									<div className="col-6">
										<h4>Email</h4>
										<p>{applicant?.email || ''}</p>
									</div>
									<div className="col-xs-12">
										<h4>Mobile Number</h4>
										<p>{applicant?.mobileNumber || ''}</p>
									</div>
								</div>
								<div class="d-flex col-12">
									<button className="rounded p-2 w-100 text-uppercase text-light dcv">
										download cv
									</button>
								</div>
							</div>
						))
					)}
				</div>
			) : (
				<div class="article-sec  ">
					{/* <button className="btn btn-outline-warning ps-4 m-2 d-block pe-4 p-2 ms-auto" style={{transform:'translateY(-50px)'}}> Create new article</button> */}
					<div class="article-search d-lg-flex justify-content-lg-between">
						<h4 className="text-light">applications</h4>
						<div class="search-div">
							<input
								type="text"
								placeholder="Search For Jobs"
								// onChange={handelSearchInput}
								onInput={handelSearchInput}
							/>

							<div>
								<FontAwesomeIcon
									icon={faSearch}
									className="text-warning"
									onClick={handleSearch}
								/>
							</div>
						</div>
					</div>
					<div class="article-content">
						<table class="  table table-borderless text-light mx-auto table-responsive-sm    ">
							<thead className="m-3">
								<tr>
									<th class="col">Applicant</th>
									<th class="col">experience</th>
									<th class="col">email </th>
									<th class="col">mobile Number</th>
									<th class="col"></th>
								</tr>
							</thead>
							{applications?.length < 1 ? (
								<h6 className="text-center">
									There is no Applications for this job yet!
								</h6>
							) : (
								applications?.map((app, index) => (
									<tr key={index}>
										<td>{app?.name || ''}</td>
										<td>
											{app?.exp || ''}
											{app?.exp > 1 ? ' years' : ' year'}
										</td>
										<td>{app?.email || ''}</td>
										<td>{app?.mobileNumber || ''}</td>
										<td>
											<a
												className="btn"
												style={{
													backgroundColor: '#bf9b30 !important',
													borderColor: '#bf9b30',
												}}
												href={app?.cv && domainBack + app?.cv}
												download="Example-PDF-document"
												target="_blank"
												rel="noreferrer"
											>
												Download
											</a>
										</td>
									</tr>
								))
							)}
						</table>
					</div>
				</div>
			)}
			{applications?.length > 0 && (
				<Pagination
					total={total}
					pages={pages}
					currentPage={page}
					limit={limit}
					onPageChange={handlePageChange}
				/>
			)}
		</>
	);
}
export default Applications;
