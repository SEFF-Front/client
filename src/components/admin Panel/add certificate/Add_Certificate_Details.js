import React, { useEffect, useState } from 'react';
import './Add_Certificate_Details.css';
import Dragdrop from '../../Drag drop/Dragdrop';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { fetchCourses } from '../../redux/reducers/CourseSlice';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { createCertificate, getCertificate } from '../../redux/reducers/certificateSlice';
import { getAllUsers } from '../../redux/reducers/userSlice';
import {
	newCertificateValidation,
	updateCertificateValidation,
} from '../../../validation/certificate.validation';

const AddCertificateDetails = ({ type = 'new' }) => {
	// ------------------------------ server ---------------------------
	const dispatch = useDispatch();
	const { certificate, loading, success } = useSelector((state) => state.certificates);
	const { courses } = useSelector((state) => state.courses);
	const { course } = useSelector((state) => state.courses);
	const { users } = useSelector((state) => state.user);

	const [isSelectFile, setIsSelectFile] = useState(false);

	const initialCertificate = {
		student: '',
		acquired_date: '',
		upload_date: moment(Date.now()).format('yyyy-MM-DD'),
		course: '',
		certificate_file: '',
	};

	const {
		register,
		handleSubmit,
		setValue,
		setError,
		reset,
		formState: { errors, isSubmitting, touchedFields },
	} = useForm({
		defaultValues: initialCertificate,
		values: type === 'edit' && certificate && certificate,
		mode: 'all',
		criteriaMode: 'all',
		reValidateMode: 'onChange',
		resolver: joiResolver(
			type === 'edit' ? updateCertificateValidation : newCertificateValidation
		),
	});

	const formInfo = new FormData();

	const submitCourse = async (data) => {
		if (!formInfo.has('certificate_file')) {
			setError('certificate_file', 'certificate file is required');
		} else {
			setError('certificate_file', '');
		}

		if (type === 'edit') {
			// add only changed fields ----------------touchedFields
			// for (const key in data) {
			// 	if (Object.hasOwnProperty.call(data, key) && touchedFields[key]) {
			// 		formInfo.set(key, data[key]);
			// 	}
			// }
			// dispatch(updateCertificate({ id: courseId, data: formInfo }));
		} else {
			for (const key in data) {
				formInfo.set(key, data[key]);
			}

			dispatch(createCertificate(formInfo));
			if (success) {
				reset();
			}
		}
	};

	useEffect(() => {
		if (!isSelectFile) {
			setError('certificate_file', 'certificate file is required');
		} else {
			setError('certificate_file', '');
		}
	}, [isSelectFile, setError]);

	useEffect(() => {
		dispatch(
			fetchCourses({ role: 'admin', filter: { isPublished: true }, limit: 100 })
		);
		// dispatch(getAllUsers({ role: 'admin', filter: { role: 'Student', isActive:true } }));
		dispatch(
			getAllUsers({
				page: 1,
				fieldName: 'role',
				fieldValue: 'Student',
				searchBy: '',
				searchValue: '',
			})
		);
		if (type === 'edit') {
			dispatch(getCertificate());
		}
	}, [type, dispatch]);
	// ------------------------------ server ---------------------------

	const handleFileDrop = (droppedFile) => {
		setValue('certificate_file', droppedFile);
		formInfo.set('certificate_file', droppedFile);
		setIsSelectFile(droppedFile ? true : false);
	};

	return (
		<>
			<div className="left-box"></div>
			<form className="home" onSubmit={handleSubmit(submitCourse)}>
				<div className="overlay">
					<div className="container-info ">
						<h2 className="h2-title">Add Certificate Details</h2>
						<span className="row3"></span>
						<div className="details">
							<div className="info ">
								<div className="inp1 bg-transparent ">
									<label className="label" for="studentname">
										Student Name
									</label>
									<select
										className={`form-select bg-secondary bg-opacity-25 text-light input co ${
											touchedFields?.student &&
											(!errors.student ? ' is-valid' : '')
										}
										${errors.student ? ' is-invalid' : ''}
										`}
										defaultValue={certificate?.student?._id || ''}
										{...register('student')}
									>
										<option value="">select student</option>
										{users?.map((co) => (
											<option
												className="option"
												key={co?._id}
												value={co?._id}
												selected={
													type === 'edit' && co?._id === course?.student?._id
												}
											>
												{`${co?.firstName} ${co?.lastName}`}
											</option>
										))}
									</select>
									<p className="mb-1 invalid-feedback">
										{errors?.student?.message}
									</p>
								</div>

								<div className="inp1 bg-transparent">
									<label className="label" for="date_acquired">
										Date Acquired
									</label>
									<input
										className={`form-control bg-secondary bg-opacity-25 text-light input 
											${touchedFields?.acquired_date && (!errors.acquired_date ? ' is-valid' : '')}
											${errors.acquired_date ? ' is-invalid' : ''}`}
										type="date"
										{...register('acquired_date')}
									/>
									<p className="mb-1 invalid-feedback">
										{errors?.acquired_date?.message}
									</p>
								</div>
								<div className="inp1 bg-transparent">
									<label className="label" for="upload_date">
										Upload Date
									</label>
									<input
										className={`form-control bg-secondary bg-opacity-25 text-light input 
											${touchedFields?.upload_date && (!errors.upload_date ? ' is-valid' : '')}
											${errors.upload_date ? ' is-invalid' : ''}`}
										type="date"
										{...register('upload_date')}
									/>
									<p className="mb-1 invalid-feedback">
										{errors?.upload_date?.message}
									</p>
								</div>
							</div>
							<div className="info_course ">
								<div className="inp1 bg-transparent">
									<label className="label" for="course">
										Course Title
									</label>
									<select
										id="course"
										className={`form-control bg-secondary bg-opacity-25 text-light co input2 
											${touchedFields?.course && (!errors.course ? 'is-valid' : '')}
											${errors.course ? 'is-invalid' : ''}`}
										defaultValue={certificate?.course?._id || ''}
										{...register('course')}
									>
										<option className="option" value="" selected>
											select course...
										</option>
										{courses?.map((co) => (
											<option
												className="option"
												key={co?._id}
												value={co?._id}
												selected={
													type === 'edit' &&
													co?._id === certificate?.course?._id
												}
											>
												{co?.name}
											</option>
										))}
									</select>
									<p className="mb-1 invalid-feedback">
										{errors?.course?.message}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className=" ">
						<h2 className="title text-light    ">Upload File</h2>
						<p className="mb-1 text-danger">
							{' '}
							{errors?.certificate_file?.message}{' '}
						</p>
						<Dragdrop onFileDrop={handleFileDrop} />
						<div className="d-flex justify-content-end gap-3 mt-3 text-light">
							<button
								id="reset"
								className=" btn bg-secondary text-light ps-4 pe-4 p-2 "
								type="reset"
								onClick={reset}
							>
								CANCEL
							</button>
							<button
								className="  btn bg-warning text-light ps-4 pe-4 p-2"
								type="submit"
								disabled={isSubmitting || loading}
							>
								{!loading && !isSubmitting ? (
									'UPLOAD'
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
				</div>
			</form>
		</>
	);
};
export default AddCertificateDetails;
