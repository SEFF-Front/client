import { useRef, useState } from 'react';
import Dragdrop from '../../Drag drop/Dragdrop';
import './AddJob.css';
import { useDispatch, useSelector } from 'react-redux';
import { createJob } from '../../redux/reducers/JobSlice.';
import { useForm } from 'react-hook-form';
import Pagination from '../../pagination/pagination';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddJob() {
	// const [formData, setFormData] = useState({
	//   companyName: "",
	//   field: "",
	//   location: "",
	//   aboutCompany: "",
	//   companyLogo: "",
	//   position: "",

	//   jobType: "",

	//   link: "",
	//   salary: [],
	//   currency: "",
	//   jobDescription: "",
	//   jobRequirements: "",
	//   skills: "",
	//   isAvailable: false,
	// });

	// const handleImageChange = (e) => {
	//   const file = e.target.files[0];
	//   if (file) {
	//     setFormData((prevDetails) => ({
	//       ...prevDetails,
	//       companyLogo: URL.createObjectURL(file),
	//     }));
	//   }
	// };

	// const dispatch = useDispatch();
	// const handleInputChange = (e) => {
	//   const { id, value } = e.target;
	//   setFormData((prevState) => ({
	//     ...prevState,
	//     [id]: value,
	//   }));
	// };

	// const handleSubmit = (e) => {
	//   e.preventDefault();
	//   // Use formData object for further processing (e.g., sending to API)
	//   console.log(formData);
	//   const required = Object.keys(formData).every((key) => {
	//     if (formData[key] !== undefined && formData[key] !== "") {
	//       return true;
	//     } else {
	//       return false;
	//     }
	//   });
	//   required ? handleSuccess() : toast.error("fill all fields");
	//   // Reset form data after submission
	// };
	// const handleSuccess = () => {
	//   dispatch(createJob(formData));
	//   setFormData({
	//     companyName: "",
	//     field: "",
	//     location: "",
	//     aboutCompany: "",
	//     companyLogo: "",
	//     position: "",

	//     jobType: "",

	//     link: "",
	//     salary: [],
	//     currency: "",
	//     jobDescription: "",
	//     jobRequirements: "",
	//     skills: "",
	//     isAvailable: false,
	//   });
	//   toast.success("successfully uploaded");
	// };

	//////////////////////////////////////

	const dispatch = useDispatch();

	const [img, setImg] = useState(null);
	const [show, setShow] = useState(null);

	const imgInput = useRef();
	const navigate = useNavigate();

	const handleImgUpload = (e) => {
		const file = e.target.files[0];
		setImg(file);
		setShow(URL.createObjectURL(file));
	};

	const { register, handleSubmit, reset, setValue } = useForm();

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
		dispatch(createJob({ ...jobData, date: Date.now() }))
			.unwrap()
			.then(() => {
				toast.success('successfully submitted');
				navigate('/adminpanel/jobbs/');
			})
			.catch((backendError) => {
				if (Array.isArray(backendError)) {
					backendError.map((error) => {
						toast.error(error.message);
					});
				} else {
					toast.error(backendError.error || 'An unknown error occurred');
				}
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
						Add Job Details
					</h2>
					<button
						className="btn ps-5 pe-5 pt-1 pb-1  text-light "
						style={{ background: '#bf9b30' }}
						onClick={() => setValue('isAvailable', true)}
					>
						{' '}
						publish
					</button>
				</div>
				<div className="row align-items-center ">
					<div className="col-lg-7   col-md-1  2 ">
						<label className="label mb-1 mt-2 " htmlFor="company_name">
							Company Name
						</label>
						<input
							type="text"
							style={{ height: '50px' }}
							id="companyName"
							className="input m-2 ms-0 mb-5"
							{...register('companyName')}
							// value={formData.companyName}
							// onChange={handleInputChange}
						/>

						<div className="row mt-5">
							<div className="col-md-6  ">
								<label className="label mb-1 mt-2" htmlFor="filed">
									Field
								</label>
								<input
									className="input2"
									id="field"
									{...register('field')}
									// value={formData.field}
									// onChange={handleInputChange}
								/>
							</div>
							<div className="col-md-6  ">
								<label className="label mb-1 mt-2" htmlFor="location">
									Location
								</label>
								<input
									className="input2"
									id="location"
									{...register('location')}
									// value={formData.location}
									// onChange={handleInputChange}
								/>
							</div>
						</div>
					</div>

					<div className="col-lg-5   col-md-1  2 p-0">
						<p className="text-light">Company Logo</p>
						<div className="">
							{/* <Dragdrop /> */}
							<div>
								{show && (
									<img
										src={show}
										alt="Selected"
										style={{ maxWidth: '100%', maxHeight: '200px' }}
									/>
								)}

								<input ref={imgInput} type="file" onChange={handleImgUpload} />
							</div>
						</div>
					</div>
				</div>
				<div>
					<label className="label mb-1 mt-2" htmlFor="about-company">
						About The Company
					</label>
					<textarea
						style={{ height: '115px' }}
						name="aboutCompany"
						id="aboutCompany"
						rows={3}
						className="input"
						{...register('aboutCompany')}
						// value={formData.aboutCompany}
						// onChange={handleInputChange}
					></textarea>
				</div>
				<div className="info info4">
					<div className=" ">
						<label className="label mb-1 mt-2" htmlFor="Position">
							Position
						</label>
						<input
							type="text"
							id="position"
							className="input2"
							{...register('position')}
							// value={formData.position}
							// onChange={handleInputChange}
						/>
					</div>
					{/* <div className="inp1 inp4"> */}
					{/* <label className="label" htmlFor="jobtype">
              Job Type
            </label>
            <input
              type="text"
              id="jobType"
              className="input2"
              {...register("jobType")}
              // value={formData.jobType}
              // onChange={handleInputChange}
            /> */}
					{/* </div> */}
					<div className="text-white d-flex flex-row ms-2 gap-3 p-3 align-items-end">
						<span className="fs-5 mb-1 mt-2">job type : </span>
						<div className="d-flex gap-2">
							<input
								type="radio"
								name="jobType"
								id="jobType"
								value="remote"
								{...register('jobType')}
								// checked={formData.jobType === "remote"}
								// onChange={handleInputChange}
							/>
							<label className="label mb-1 mt-2" htmlFor="remote">
								Remote
							</label>
						</div>
						<div className="d-flex gap-2">
							<input
								type="radio"
								name="jobType"
								id="jobType"
								value="onSite"
								{...register('jobType')}
								// checked={formData.jobType === "onSite"}
								// onChange={handleInputChange}
							/>
							<label className="label mb-1 mt-2" htmlFor="onsite">
								On site
							</label>
						</div>
					</div>
				</div>
				<div className="row align-items-center">
					<div className="col-md-6  ">
						<label className="label mb-1 mt-2" htmlFor="salary">
							Salary from
						</label>
						<input
							className="input2"
							type="number"
							id="from"
							{...register('salary[0].from')}
						/>
					</div>
					<p
						className=" mb-1 mt-2 text-light p-0 d-flex flex-row gap-2 align-items-center"
						style={{ transform: 'translateY(25px)', width: 'fit-content' }}
					>
						To
						<input
							type="number"
							id="to"
							className="input2"
							{...register('salary[0].to')}
							// value={formData.salary}
							// onChange={handleInputChange}
						/>
					</p>
					<div className="col-md-6  ">
						<label className="label mb-1 mt-4" htmlFor="salary">
							currency
						</label>
						<input
							className="input2"
							id="currency"
							{...register('currency')}
							// value={formData.currency}
							// onChange={handleInputChange}
						/>
					</div>
					<div className="col-md-3   p-0">
						<label className="label mb-1 mt-2" htmlFor="link">
							link
						</label>
						<input
							type="url"
							id="link"
							className="input2"
							{...register('link')}
							// value={formData.link}
							// onChange={handleInputChange}
						/>
					</div>
				</div>
				<div>
					<label className="label mb-1 mt-2" htmlFor=" job-description">
						Job Description
					</label>
					<textarea
						style={{ height: '115px' }}
						name="textarea"
						id="jobDescription"
						rows={3}
						className="input"
						{...register('jobDescription')}
						// value={formData.jobDescription}
						// onChange={handleInputChange}
					></textarea>
				</div>
				<div>
					<label className="label mb-1 mt-2" htmlFor="job-requirements">
						Job Requirements
					</label>
					<textarea
						style={{ height: '115px' }}
						name="textarea"
						id="jobRequirements"
						rows={3}
						className="input"
						{...register('jobRequirements')}
						// value={formData.jobRequirements}
						// onChange={handleInputChange}
					></textarea>
				</div>
				<div>
					<label className="label mb-1 mt-2" htmlFor="skills">
						Skills
					</label>
					<input
						type="text"
						id="skills"
						className="input2 disabled skills"
						{...register('skills')}
						// value={formData.skills}
						// onChange={handleInputChange}
					/>
				</div>
				<div className="d-flex p-3 flex-row gap-3 justify-content-end">
					<button
						type="submit"
						id="save"
						className="btn  ps-4 pe-4 p-2 text-light fw-lg"
						style={{ background: '#bf9b30' }}
						// onClick={handleSubmit}
						onClick={() => setValue('isAvailable', false)}
					>
						Save
					</button>
					<button
						type="reset"
						id="reset"
						className="btn bg-secondary ps-4 pe-4 p-2 text-light fw-lg"
						// onclick="resetresetValue()"
						onClick={reset}
					>
						CANCEL
					</button>
				</div>
			</form>
			{/* <Pagination total={total} pages={pages} currentPage={page} limit={limit} onPageChange={handlePageChange} /> */}
		</div>
	);
}

export default AddJob;
