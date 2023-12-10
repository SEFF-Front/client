import { useEffect, useRef, useState } from 'react';
import './updateJob.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneJob, updateJob } from '../../redux/reducers/JobSlice.';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function UpdateJob() {
	const { job } = useSelector((state) => state.jobs);
	const dispatch = useDispatch();

	const [img, setImg] = useState(null);
	const [show, setShow] = useState(
		job?.companyLogo
			? `http://localhost:4000/seff-academy/uploads/${job.companyLogo}`
			: ''
	);

	const imgInput = useRef();
	const navigate = useNavigate();

	const handleImgUpload = (e) => {
		const file = e.target.files[0];
		setImg(file);
		setShow(URL.createObjectURL(file));
	};

	const initialJobDataRef = useRef({
		companyName: job?.companyName ?? null,
		field: job?.field ?? null,
		location: job?.location,
		aboutCompany: job?.aboutCompany,
		position: job?.position ?? null,
		jobType: job?.jobType ?? null,
		jobDescription: job?.jobDescription ?? null,
		jobRequirements: job?.jobRequirements ?? null,
		link: job?.link ?? null,
		currency: job?.currency ?? null,
		skills: job?.skills ?? null,
		salary: job?.salary || 0,
	});
	useEffect(() => {
		initialJobDataRef.current = {
			companyName: job?.companyName ?? null,
			field: job?.field ?? null,
			location: job?.location,
			aboutCompany: job?.aboutCompany,
			position: job?.position ?? 0,
			jobType: job?.jobType ?? null,
			jobDescription: job?.jobDescription ?? null,
			jobRequirements: job?.jobRequirements ?? null,
			link: job?.link ?? null,
			currency: job?.currency ?? null,
			skills: job?.skills ?? null,
			salary: job?.salary || 0,
		};
	}, [job]);

	const { register, handleSubmit, reset } = useForm();
	const onSubmit = (data) => {
		const jobData = Object.fromEntries(
			Object.entries(data).filter(([key, value]) => value !== undefined)
		);
		if (img) {
			jobData.companyLogo = img;
		}
		if (Object.keys(jobData).length === 0) {
			toast.warn('No data to submit.');
			return;
		}
		dispatch(updateJob({ jobId: job._id, updatedData: jobData }))
			.unwrap()
			.then(() => {
				toast.success('successfully updated job.');
				navigate('/adminpanel/jobbs/');
			})
			.catch((backendError) => {
				toast.error(backendError.error);
			});
	};

	return (
		<div className="container home mt-5">
			<form onSubmit={handleSubmit(onSubmit)} className="details_job">
				<div className="d-flex justify-content-between align-items-center">
					<h2
						className="h2-title border-bottom border-warning pb-2"
						style={{ width: 'fit-content' }}
					>
						Update Job Details
					</h2>
					<button
						className="btn ps-5 pe-5 pt-1 pb-1  text-light "
						style={{ background: '#bf9b30' }}
					>
						{' '}
						publish
					</button>
				</div>
				<div className="row align-items-center ">
					<div className="col-lg-7   col-md-1  2 ">
						<label className="label mb-1 mt-4 " htmlFor="company_name">
							Update Update Company Name
						</label>
						<input
							defaultValue={initialJobDataRef.current.companyName}
							type="text"
							style={{ height: '50px' }}
							id="companyName"
							className="input m-2 ms-0 mb-5"
							{...register('companyName')}
						/>

						<div className="row mt-5">
							<div className="col-md-6  ">
								<label className="label mb-1 mt-4" htmlFor="filed">
									Update Update Field
								</label>
								<input
									defaultValue={initialJobDataRef.current.field}
									className="input2"
									id="field"
									{...register('field')}
								/>
							</div>
							<div className="col-md-6  ">
								<label className="label mb-1 mt-4" htmlFor="location">
									Update Location
								</label>
								<input
									defaultValue={initialJobDataRef.current.location}
									className="input2"
									id="location"
									{...register('location')}
								/>
							</div>
						</div>
					</div>

					<div className="col-lg-5   col-md-1  2 p-0">
						<p className="text-light">Update Company Logo</p>
						<div className="">
							<div>
								{show && (
									<img
										src={show}
										alt="Selected"
										style={{ maxWidth: '100%', maxHeight: '200px' }}
									/>
								)}

								<input
									ref={imgInput}
									type="file"
									onChange={handleImgUpload}
									defaultValue={initialJobDataRef.current.companyLogo}
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					<label className="label mb-1 mt-4" htmlFor="about-company">
						Update About The Company
					</label>
					<textarea
						defaultValue={initialJobDataRef.current.aboutCompany}
						style={{ height: '115px' }}
						name="aboutCompany"
						id="aboutCompany"
						rows={3}
						className="input"
						{...register('aboutCompany')}
					></textarea>
				</div>
				<div className="info info4">
					<div className=" ">
						<label className="label mb-1 mt-4" htmlFor="Position">
							Update Position
						</label>
						<input
							defaultValue={initialJobDataRef.current.position}
							type="text"
							id="position"
							className="input2"
							{...register('position')}
						/>
					</div>

					<div className=" text-white d-flex flex-row  fs-5 mb-1 mt-4 ms-4 align-items-end">
						{` Job Type is: ${initialJobDataRef.current.jobType}`}
					</div>
					<div className=" text-white d-flex flex-row   gap-2   align-items-end">
						{/* {` Job Type is: ${initialJobDataRef.current.jobType}`} */}
						<span className="fs-5   ms-1 mt-4">Update job type</span>
						<div className="d-flex gap-2">
							<input
								defaultChecked={initialJobDataRef.current.jobType === 'remote'}
								type="radio"
								name="jobType"
								id="remote"
								value="remote"
								{...register('jobType')}
							/>
							<label className="label  " htmlFor="remote">
								Remote
							</label>
						</div>
						<div className="d-flex gap-2">
							<input
								defaultValue={initialJobDataRef.current.jobType === 'onSite'}
								type="radio"
								name="jobType"
								id="onSite"
								value="onSite"
								{...register('jobType')}
							/>
							<label className="label " htmlFor="onsite">
								On site
							</label>
						</div>
					</div>
				</div>
				<div className="row align-items-center">
					<div className="col-md-6  ">
						<label className="label mb-1 mt-4" htmlFor="salary">
							Update Salary from
						</label>
						<input
							defaultValue={initialJobDataRef.current.salary[0]?.from}
							className="input2"
							id="from"
							{...register('salary[0].from')}
						/>
					</div>
					<p
						className=" mb-1 mt-4 text-light p-0 d-flex flex-row gap-2 align-items-center"
						style={{ transform: 'translateY(25px)', width: 'fit-content' }}
					>
						To
						<input
							defaultValue={initialJobDataRef.current.salary[0]?.to}
							type="text"
							id="to"
							className="input2"
							{...register('salary[0].to')}
						/>
					</p>
					<div className="col-md-6  ">
						<label className="label mb-1 mt-4" htmlFor="salary">
							Update currency
						</label>
						<input
							defaultValue={initialJobDataRef.current.currency}
							className="input2"
							id="currency"
							{...register('currency')}
						/>
					</div>
					<div className="col-md-3   p-0">
						<label className="label mb-1 mt-4" htmlFor="link">
							Update link
						</label>
						<input
							defaultValue={initialJobDataRef.current.link}
							type="url"
							id="link"
							className="input2"
							{...register('link')}
						/>
					</div>
				</div>
				<div>
					<label className="label mb-1 mt-4" htmlFor=" job-description">
						Update Job Description
					</label>
					<textarea
						defaultValue={initialJobDataRef.current.jobDescription}
						style={{ height: '115px' }}
						name="textarea"
						id="jobDescription"
						rows={3}
						className="input"
						{...register('jobDescription')}
					></textarea>
				</div>
				<div>
					<label className="label mb-1 mt-4" htmlFor="job-requirements">
						Update Job Requirements
					</label>
					<textarea
						defaultValue={initialJobDataRef.current.jobRequirements}
						style={{ height: '115px' }}
						name="textarea"
						id="jobRequirements"
						rows={3}
						className="input"
						{...register('jobRequirements')}
					></textarea>
				</div>
				<div>
					<label className="label mb-1 mt-4" htmlFor="skills">
						Update Skills
					</label>
					<input
						defaultValue={initialJobDataRef.current.skills}
						type="text"
						id="skills"
						className="input2 disabled skills"
						{...register('skills')}
					/>
				</div>
				<div className="d-flex p-3 flex-row gap-3 justify-content-end">
					<button
						type="submit"
						id="save"
						className="btn  ps-4 pe-4 p-2 text-light fw-lg"
						style={{ background: '#bf9b30' }}
					>
						Save
					</button>
					<button
						type="reset"
						id="reset"
						className="btn bg-secondary ps-4 pe-4 p-2 text-light fw-lg"
					>
						CANCEL
					</button>
				</div>
			</form>
		</div>
	);
}

export default UpdateJob;
