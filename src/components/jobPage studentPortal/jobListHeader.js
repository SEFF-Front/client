import { faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { domainBack } from '../../utils/Api';
import img from '../../assest/oooo.jpg';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';

function JobListHeader({ type = 'list', job, children }) {
	const navigate = useNavigate();
	return (
		<div class="div1 m-md-3">
			<div class="dd-info row">
				<div class="col-1 p-0 d-flex justify-content-center ">
					<img
						src={job?.companyLogo ? domainBack + job?.companyLogo : img}
						alt={job?.companyName || ''}
						// width='100%' height='auto'
						width="50"
						height="50"
					/>
					{/* <span
						style={{
							fontSize: 'larger',
							fontWeight: '900',
							fontFamily: 'Cambria,Cochin,Georgia,Times,Times New Roman,serif',
						}}
					>
						≡
					</span>
					IT */}
				</div>
				<div className="col-md-8 col-sm-12 p-0">
					<h2>{job?.position || ''}</h2>
					<p>
						{job?.companyName || ''} , {job?.location}
					</p>
				</div>
				<div class="info2 col-md-3 p-0 text-md-end">
					<h5>
						{`${job?.salary[0]?.from || 0} - ${job?.salary[0]?.to || 0} ${
							job?.currency || 'EGY'
						} per month`}
					</h5>
					<p id="pi">
						<FontAwesomeIcon icon={faLocationDot} style={{ color: '#bf9b30' }} />
						&#160;
						{job?.jobType || ''}
					</p>
				</div>
				<p class="p-general">{job?.jobDescription || ''}</p>
			</div>

			<p class="p-general">{job?.about}</p>
			<button class="btn">React JS</button>
			<button class="btn">Development</button>

			{type === 'details' && (
				<>
					<div class=" col-6">
						<p class="p-details ">
							<FontAwesomeIcon icon={faClock} style={{ color: 'grey' }} />
							&#160;
							{moment(new Date(job?.date)).fromNow()}
						</p>
					</div>

					<div>
						<h2>About us</h2>
						<p class="p-general">{job?.aboutCompany || ''}</p>
						<h2>Job Description</h2>
						<p class="p-general">{job?.jobDescription || ''}</p>
						<h2>Job Requirements</h2>
						<p class="p-general">{job?.jobRequirements || ''}</p>
					</div>
				</>
			)}

			<div class="view-details row d-flex m-0 mt-5  p-0">
				{type === 'list' ? (
					<>
						<div class=" col-6">
							<p class="p-details ">
								<FontAwesomeIcon icon={faClock} style={{ color: 'grey' }} />
								&#160;
								{moment(new Date(job?.date)).fromNow()}
							</p>
						</div>
						<div className="col-6 d-flex justify-content-end m-0 p-0">
							<Link
								class="btn btn-details mb-0"
								id="detail"
								to={`/jobs/${job?._id}`}
								// onClick={() => handleDetails(job.id)}
							>
								VIEW DETAILS
							</Link>
						</div>
					</>
				) : (
					<button
						class="btn btn-details mb-0"
						onClick={() =>
							navigate(`/jobs/${job?._id}/add-application`, {
								state: {
									jobId: job?._id,
								},
							})
						}
					>
						Apply
					</button>
				)}
			</div>
		</div>
	);
}

export default JobListHeader;
