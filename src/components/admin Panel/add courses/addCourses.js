import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './addCourses.css';
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';
import Dragdrop from '../../Drag drop/Dragdrop';
import Select from 'react-select';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, getCourse, updateCourse } from '../../redux/reducers/CourseSlice';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import {
	newCourseValidation,
	updateCourseValidation,
} from '../../../validation/course.validation';
import Api, { domainBack } from '../../../utils/Api';
import { toast } from 'react-toastify';
import moment from 'moment';

function AddCourses({ type = 'new' }) {
	// ------------------------------ server ---------------------------
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { courseId } = useParams();
	const { course, loading } = useSelector((state) => state.courses);

	const initialCourse = {
		name: '',
		level: '',
		lessons: '',
		language: '',
		duration: '',
		certificate: '',
		materials: '',
		introduction: '',
		assessments: '',
		requirements: '',
		start_date: '',
		publish_date: '',
		Instructor: '',
		image: '',
		enrolledStudents: [],
	};
	const editableData = (data, initial) => {
		let info = {};
		for (const key in initial) {
			info[key] = data[key] || '';
		}
		return info;
	};

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		getValues,
		formState: { errors, isSubmitting, touchedFields },
	} = useForm({
		mode: 'all',
		criteriaMode: 'all',
		reValidateMode: 'onChange',
		defaultValues: initialCourse,
		values: type === 'edit' &&
			course && {
				...editableData(course, initialCourse),
				Instructor: course?.Instructor?._id,
				start_date: moment(new Date(course?.start_date)).format('yyyy-MM-DD'),
				publish_date: moment(new Date(course?.publish_date)).format(
					'yyyy-MM-DD HH:mm'
				),
			},

		resolver: joiResolver(
			type === 'edit' ? updateCourseValidation : newCourseValidation
		),
	});

	const submitCourse = async (data) => {
		try {
			if (type === 'edit') {
				await dispatch(updateCourse({ id: courseId, data })).unwrap();
			} else {
				await dispatch(createCourse(data)).unwrap();
			}
			setSelectedStudents([]);
			reset();
			navigate(`/adminPanel/courses`);
		} catch (error) {
			toast.error(error.message);
		}
	};
	const [Instructors, setInstructors] = useState([]);
	const [students, setStudents] = useState([]);
	const [availableStudents, setAvailableStudents] = useState([]);
	const [selectedStudents, setSelectedStudents] = useState([]);

	useEffect(() => {
		const getInstructors = async (value, setData) => {
			try {
				const res = await Api.get('/users/get-all', {
					params: { fieldName: 'role', fieldValue: value, limit: 100 },
				});
				setData(res.data?.data);
			} catch (error) {
				toast.error(error.message);
			}
		};
		getInstructors('Instructor', setInstructors);
		getInstructors('Student', setStudents);

		if (type === 'edit') {
			dispatch(getCourse({ role: 'admin', id: courseId }));
		}
	}, [type, courseId, dispatch]);

	useEffect(() => {
		if (type === 'edit') {
			dispatch(getCourse({ role: 'admin', id: courseId }));
		}
	}, [courseId, dispatch]);

	// react-select --------------------------
	useEffect(() => {
		setAvailableStudents(
			students?.map((user) => ({
				label: `${user?.firstName} ${user?.lastName}`,
				value: user?._id,
			}))
		);
	}, [students]);

	const HandelStudentSelect = (val) => {
		const students = val?.map((st) => ({ student: st.value, score: 0 }));
		setValue('enrolledStudents', students, { shouldTouch: true });
		setSelectedStudents(val);
	};

	useEffect(() => {
		if (type === 'edit' && course?.enrolledStudents?.length > 0) {
			setSelectedStudents([]);
			const data = course?.enrolledStudents?.map((e) => ({
				value: e?.student?._id && e?.student?._id,
				label:
					e?.student?.firstName &&
					`${e?.student?.firstName} ${e?.student?.lastName}`,
			}));
			setSelectedStudents(data);
		} else {
			setSelectedStudents([]);
		}
	}, [type, course?.enrolledStudents]);

	const handleFileDrop = (droppedFile) => {
		setValue('image', droppedFile, { shouldTouch: true });
		// formInfo.set('image', droppedFile);
	};
	// ------------------------------ server ---------------------------

	return (
		<div class="container ">
			<div class="row mt-5 w-100">
				<div class="course-details col-md-12">
					<form
						class="inputs-container row p-3  text-white bg-opacity-25 bg-black"
						onSubmit={handleSubmit(submitCourse)}
					>
						<div class="mb-3 d-flex justify-content-between course-header ">
							<div>
								<h5>Add Course Details</h5>
								<div class="details-line"></div>
							</div>
							<div>
								<button
									class="btn text-white"
									type="submit"
									disabled={isSubmitting || loading}
									onClick={() => setValue('isPublished', true)}
								>
									{!loading && !isSubmitting ? (
										'PUBLISH'
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

						<div class="form-section col-md-6 col-lg-6 col-12">
							<label htmlFor="name">Course Name</label>
							<input
								type="text"
								className={`form-control bg-secondary bg-opacity-25
									${touchedFields?.name && (!errors.name ? 'is-valid' : '')}
									${errors.name ? 'is-invalid' : ''}
								`}
								{...register('name')}
							/>
							<p className="mb-1 invalid-feedback">{errors?.name?.message}</p>
						</div>

						<div class="form-section col-md-2 col-lg-2 col-12">
							<label htmlFor="level">Level</label>
							<input
								type="text"
								className={`form-control bg-secondary bg-opacity-25
									${touchedFields?.level && (!errors.level ? 'is-valid' : '')}
									${errors.level ? 'is-invalid' : ''}
								`}
								{...register('level')}
							/>
							<p className="mb-1 invalid-feedback">{errors?.level?.message}</p>
						</div>

						<div class="form-section col-md-4 col-lg-4 col-12">
							<label htmlFor="lessons">Number of Lessons</label>
							<input
								type="text"
								className={`form-control bg-secondary bg-opacity-25
									${touchedFields?.lessons && (!errors.lessons ? 'is-valid' : '')}
									${errors.lessons ? 'is-invalid' : ''}
								`}
								{...register('lessons')}
							/>
							<p className="mb-1 invalid-feedback">{errors?.lessons?.message}</p>
						</div>

						<div class="form-section col-md-3 col-lg-3 col-12">
							<label htmlFor="language">Language</label>
							<input
								type="text"
								className={`form-control bg-secondary bg-opacity-25
								${touchedFields?.language && (!errors.language ? 'is-valid' : '')}
								${errors.language ? 'is-invalid' : ''}
								`}
								{...register('language')}
							/>
							<p className="mb-1 invalid-feedback">{errors?.language?.message}</p>
						</div>

						<div class="form-section col-md-3 col-lg-3 col-12">
							<label htmlFor="start_date">Start Date</label>
							<div class="input-group input-group-icon">
								<span class="input-group-text bg-secondary bg-opacity-25  ">
									<FontAwesomeIcon icon={faCalendar} className="color-yellow " />
								</span>
								<input
									type="date"
									className={`form-control bg-secondary bg-opacity-25
										${touchedFields?.start_date && (!errors.start_date ? 'is-valid' : '')}
										${errors.start_date ? 'is-invalid' : ''}
										`}
									defaultValue={
										course?.start_date && new Date(course.start_date)
									}
									{...register('start_date')}
								/>
								<p className="mb-1 invalid-feedback">
									{errors?.start_date?.message}
								</p>
							</div>
						</div>

						<div class="form-section col-md-3 col-lg-3 col-12">
							<label htmlFor="duration">Duration</label>
							<div class="input-group input-group-icon">
								<span class="input-group-text  bg-secondary bg-opacity-25  ">
									<FontAwesomeIcon icon={faClock} className="color-yellow" />
								</span>
								<input
									type="text"
									placeholder="2 months"
									className={`form-control bg-secondary bg-opacity-25
										${touchedFields?.duration && (!errors.duration ? 'is-valid' : '')}
										${errors.duration ? 'is-invalid' : ''}
									`}
									{...register('duration')}
								/>
								<p className="mb-1 invalid-feedback">
									{errors?.duration?.message}
								</p>
							</div>
						</div>

						<div class="form-section col-md-3 col-lg-3 col-12">
							<label htmlFor="certificate">Certificate</label>
							<input
								type="text"
								className={`form-control bg-secondary bg-opacity-25
                        ${
									touchedFields?.certificate &&
									(!errors.certificate ? 'is-valid' : '')
								}
								${errors.certificate ? 'is-invalid' : ''}
								`}
								{...register('certificate')}
							/>
							<p className="mb-1 invalid-feedback">
								{errors?.certificate?.message}
							</p>
						</div>

						<div class="form-section col-12">
							<label htmlFor="introduction">Course Introduction</label>
							<textarea
								rows="4"
								className={`form-control bg-secondary bg-opacity-25
								${touchedFields?.introduction && (!errors.introduction ? 'is-valid' : '')}
								${errors.introduction ? 'is-invalid' : ''}
								`}
								{...register('introduction')}
							></textarea>
							<p className="mb-1 invalid-feedback">
								{' '}
								{errors?.introduction?.message}
							</p>
						</div>

						<div class="form-section col-md-6 col-lg-6 col-12">
							<label htmlFor="assessments">Course Assessment</label>
							<textarea
								rows="4"
								className={`form-control bg-secondary bg-opacity-25
                        ${
									touchedFields?.assessments &&
									(!errors.assessments ? 'is-valid' : '')
								}
								${errors.assessments ? 'is-invalid' : ''}
								`}
								{...register('assessments')}
							></textarea>
							<p className="mb-1 invalid-feedback">
								{errors?.assessments?.message}
							</p>
						</div>

						<div class="form-section col-md-6 col-lg-6 col-12">
							<label htmlFor="requirements">Course Requirements</label>
							<textarea
								rows="4"
								className={`form-control bg-secondary bg-opacity-25
                        ${
									touchedFields?.requirements &&
									(!errors.requirements ? 'is-valid' : '')
								}
								${errors.requirements ? 'is-invalid' : ''}
								`}
								{...register('requirements')}
							></textarea>
							<p className="mb-1 invalid-feedback">
								{' '}
								{errors?.requirements?.message}
							</p>
						</div>

						<div class="form-section col-12">
							<label htmlFor="materials">Course Materials</label>
							<textarea
								rows="4"
								className={`form-control bg-secondary bg-opacity-25
                        ${
									touchedFields?.materials &&
									(!errors.materials ? 'is-valid' : '')
								}
								${errors.materials ? 'is-invalid' : ''}
								`}
								{...register('materials')}
							></textarea>
							<p className="mb-1 invalid-feedback">
								{' '}
								{errors?.materials?.message}
							</p>
						</div>

						<div class="form-section col-md-6 col-lg-6 col-12">
							<label htmlFor="publish_date">Publishing Date</label>
							<div class="input-group input-group-icon">
								<span class="input-group-text  bg-secondary bg-opacity-25  ">
									<FontAwesomeIcon icon={faCalendar} className="color-yellow " />
								</span>
								<input
									type="datetime-local"
									className={`form-control bg-secondary bg-opacity-25
                        ${
									touchedFields?.publish_date &&
									(!errors.publish_date ? 'is-valid' : '')
								}
								${errors.publish_date ? 'is-invalid' : ''}
								`}
									{...register('publish_date')}
								/>
								<p className="mb-1 invalid-feedback">
									{' '}
									{errors?.publish_date?.message}
								</p>
							</div>
						</div>

						<div class="form-section col-md-6 col-lg-6 col-12">
							<label htmlFor="Instructor">Instructor</label>
							<select
								id="InstructorsList"
								className={`form-select bg-secondary bg-opacity-25 text-light
									${touchedFields?.Instructor && (!errors.Instructor ? 'is-valid' : '')}
									${errors.Instructor ? 'is-invalid' : ''}
								`}
								style={{ border: 'none' }}
								defaultValue={course?.Instructor?._id || ''}
								{...register('Instructor')}
							>
								<option hidden>Select Instructor...</option>
								{Instructors?.map((inst) => (
									<option
										className="bg-dark bg-opacity-50"
										key={inst?._id}
										value={inst?._id}
										selected={inst?._id === course?.Instructor?._id}
									>
										{`${inst?.firstName} ${inst?.lastName}`}
									</option>
								))}
							</select>

							<p className="mb-1 invalid-feedback">
								{errors?.Instructor?.message || errors?.Instructor?.root?.message}
							</p>
						</div>

						<div className="form-section col-12">
							<label htmlFor="selectstudent">Select students</label>
							<Select
								isMulti
								isLoading={loading}
								options={availableStudents}
								value={selectedStudents && selectedStudents}
								onChange={HandelStudentSelect}
								className="basic-multi-select "
								classNamePrefix="select"
								id="selectstudent"
								styles={{
									multiValueLabel: (base) => ({
										...base,
										background: '#bf9b30',
										color: '#fff',
									}),
									control: (baseStyles, state) => ({
										...baseStyles,
										borderColor: state.isFocused ? 'black' : 'black',
										background: '#2e2f31',
									}),
									menu: (base) => ({
										...base,
										background: '#292b2c',
									}),

									option: (base, state) => ({
										...base,
										background: state.isSelected ? 'black' : '#292b2c',
										':hover': { background: 'rgb(191 155 48 / 79%)' },
										color: 'white',
									}),
								}}
							/>
						</div>

						<div class="form-section col-12 mt-4">
							<label htmlFor="instructor">Upload Cover Photo</label>
							<div class="cover-photo">
								{type === 'edit' && course?.image && (
									<img
										src={domainBack + course?.image}
										alt={course?.name}
										width="100%"
										className="mb-2"
									/>
								)}
								<Dragdrop onFileDrop={handleFileDrop} />
							</div>
						</div>

						<div class="buttons row justify-content-end mx-auto mt-3">
							<button
								class="btn cancel-btn col-md-2 col-lg-2 col-12 text-white order-last order-md-first order-lg-first mx-2"
								onClick={() => {
									reset();
									navigate('/adminPanel/courses');
								}}
							>
								CANCEL
							</button>
							<button
								class="btn save-btn col-md-2 col-lg-2 col-12 text-white ml-md-3 mb-3 mb-md-0 mb-lg-0 "
								type="submit"
								disabled={isSubmitting}
								onClick={() => setValue('isPublished', false)}
							>
								SAVE
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
export default React.memo(AddCourses);
