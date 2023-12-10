import React, { useEffect } from 'react';
import Dragdrop from '../Drag drop/Dragdrop';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { domainBack } from '../../utils/Api';
import img from '../../assest/oooo.jpg';
import { createApplication } from '../redux/reducers/ApplicationSlice';
import { fetchOneJob } from '../redux/reducers/JobSlice.';
import { newApplicationValidation } from '../../validation/application.validation';
import { toast } from 'react-toastify';

function AddApplication() {
	// ------------------------------ server ---------------------------
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { state } = useLocation();

	const { job, loading } = useSelector((state) => state.jobs);
	const { user } = useSelector((state) => state.user);

	const initialApplication = {
		name: `${user?.firstName || ''} ${user?.lastName || ''}`,
		email: user?.email || '',
		mobileNumber: user?.mobileNumber || '',
		exp: '',
		job: state?.jobId,
		cv: '',
	};

	useEffect(() => {
		dispatch(fetchOneJob(state?.jobId));
	}, []);
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isSubmitting, touchedFields },
	} = useForm({
		mode: 'all',
		criteriaMode: 'all',
		reValidateMode: 'onChange',
		defaultValues: initialApplication,

		resolver: joiResolver(newApplicationValidation),
	});

	const handleFileDrop = (droppedFile) => {
		setValue('cv', droppedFile);
		// formInfo.set('cv', droppedFile);
	};

	const submitApplication = async (data) => {
		try {
			await dispatch(createApplication(data)).unwrap();
			reset();
			navigate(-1);
		} catch (error) {
			toast.error(error?.message)
		}
	};

	// ------------------------------ server ---------------------------
	// const [dragActive, setDragActive] = useState(false);
	// const handleDrag = function (e) {
	// 	e.preventDefault();
	// 	e.stopPropagation();
	// 	if (e.type === 'dragenter' || e.type === 'dragover') {
	// 		setDragActive(true);
	// 	} else if (e.type === 'dragleave') {
	// 		setDragActive(false);
	// 	}
	// };

	return (
		<div class="view-details3 div1 m-md-3">
			<div class="dd-info row">
				<div class="spn col-1 p-0 d-flex justify-content-center">
					<img
						src={job?.companyLogo ? domainBack + job?.companyLogo : img}
						alt={job?.companyName || ''}
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
							job?.currency || 'EGP'
						} per month`}
					</h5>
					<p id="pi">
						{' '}
						<FontAwesomeIcon icon={faLocationDot} style={{ color: '#bf9b30' }} />
						&#160;
						{job?.jobType || ''}
					</p>
				</div>
			</div>
			<h2>{`${user?.firstName} ${user?.lastName}`}</h2>
			<p>{`${user?.major || ''} ${user?.university || ''}`}</p>
			{/* <p>Computer science, international islamic university</p> */}

			<form onSubmit={handleSubmit(submitApplication)}>
				<div class="form-group3 row">
					<div className="col-md-9">
						<label for="email" class="lab1">
							Email
						</label>
						<input
							type="email"
							class={`form-control inp1
                        ${touchedFields?.email && (!errors.email ? 'is-valid' : '')}
                        ${errors.email ? 'is-invalid' : ''}
                     `}
							{...register('email')}
						/>
						<p className="mb-1 invalid-feedback">{errors?.email?.message}</p>
					</div>
					<div className="col-md-3">
						<label for="num" class="lab2">
							Years Of Experience
						</label>
						<input
							type="number"
							class={`form-control inp2
                        ${touchedFields?.exp && (!errors.exp ? 'is-valid' : '')}
                        ${errors.exp ? 'is-invalid' : ''}
                     `}
							name="num"
							{...register('exp')}
						/>
						<p className="mb-1 invalid-feedback">{errors?.exp?.message}</p>
					</div>
					<div className="col-md-6">
						<label for="num3" class="lab3">
							Mobile Number
						</label>
						<input
							type="number"
							class={`form-control inp3
                        ${
									touchedFields?.mobileNumber &&
									(!errors.mobileNumber ? 'is-valid' : '')
								}
                        ${errors.mobileNumber ? 'is-invalid' : ''}
                     `}
							{...register('mobileNumber')}
						/>
						<p className="mb-1 invalid-feedback">{errors?.mobileNumber?.message}</p>
					</div>
					<div className="col-md-12 mt-3">
						<Dragdrop onFileDrop={handleFileDrop} />
					</div>
					<div className="col-12 mt-5 d-flex justify-content-end">
						<button
							type="reset"
							class="cancel"
							onClick={() => {
								reset();
								navigate(-1);
							}}
						>
							Cancel
						</button>
						{/* <button class="submit" onClick={handleSubmit}>
							Submit
						</button> */}

						<button
							class="btn text-white mb-0"
							type="submit"
							disabled={isSubmitting || loading}
						>
							{!loading && !isSubmitting ? (
								'Submit'
							) : (
								<>
									<span
										class="spinner-border spinner-border-sm"
										aria-hidden="true"
									></span>
									<span class="visually-hidden" role="status">
										Processing...
									</span>
								</>
							)}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddApplication;
