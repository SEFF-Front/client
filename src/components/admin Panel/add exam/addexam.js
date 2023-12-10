import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './addexam.css';
import Title from '../../title/title';
import Footer from '../../footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { createExam, getExam, updateExam } from '../../redux/reducers/examSlice';
import { fetchCourses } from '../../redux/reducers/CourseSlice';
import { useNavigate, useParams } from 'react-router-dom';
import {
	newExamValidation,
	updateExamValidation,
} from '../../../validation/exam.validation';

function Addexam({ type = 'new' }) {
	// ------------------------------ server ---------------------------
	const navigate = useNavigate();
	const { examId } = useParams();
	const dispatch = useDispatch();
	const { exam, loading, success } = useSelector((state) => state.exams);
	const { courses } = useSelector((state) => state.courses);
	const { user } = useSelector((state) => state.user);

	const initialExams = {
		course: '',
		date: '',
		duration: '',
		link: '',
		Instructor: user?._id,
	};

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors, isSubmitting, isSubmitSuccessful, touchedFields },
	} = useForm({
		defaultValues: initialExams,
		values: type === 'edit' &&
			exam && {
				course: exam?.course,
				date: moment(new Date(exam?.date)).format('YYYY-MM-DDTHH:mm'),
				duration: exam?.duration,
				link: exam?.link,
			},
		mode: 'all',
		criteriaMode: 'all',
		reValidateMode: 'onChange',
		resolver: joiResolver(type === 'edit' ? updateExamValidation : newExamValidation),
	});

	// const formInfo = new FormData();

	const submitExam = async (data) => {
		if (type === 'edit') {
			dispatch(updateExam({ id: examId, data }));
		} else {
			dispatch(createExam(data));
			if (isSubmitSuccessful && success) {
				reset();
			}
		}
	};

	useEffect(() => {
		dispatch(fetchCourses({ role: 'instructor', limit: 100 }));
		if (type === 'edit') {
			dispatch(getExam(examId));
		}
	}, [type, dispatch]);
	// ------------------------------ server ---------------------------

	return (
		<>
			{/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /> */}
			<div class="exams m-3 container mx-auto add-exam">
				<div className="container mx-auto ">
					<Title title={'Create New Exam'} />
				</div>
				<form onSubmit={handleSubmit(submitExam)}>
					<div class="exams-container position-relative mt-3 ">
						<div className="d-flex justify-content-between container mb-5">
							<div className="col-9" style={{ fontWeight: '900' }}>
								<h3 class=" text-capitalize text-white">add exam details</h3>
							</div>

							<button
								className="rounded border-0  course_button text-light px-3 py-0  text-uppercase col-3"
								style={{ fontWeight: '300', width: 'fit-content' }}
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
					<h5 class=" text-capitalize text-white m-3 my-5">exam information</h5>

					<div className="rounded m-2 row px-md-5 darked">
						<span className="col-md-8 px-md-3">
							<label
								for="coursename"
								className="text-light text-capitalize fw-bold d-block"
							>
								course name
							</label>
							<select
								name="coursename"
								className={`form-select bg-secondary bg-opacity-25 text-light w-100 ${
									touchedFields?.course && (!errors.course ? ' is-valid' : '')
								}
								${errors.course ? ' is-invalid' : ''}
								`}
								defaultValue={exam?.course || ''}
								{...register('course')}
							>
								<option hidden>Choose course...</option>
								{courses.map((course) => (
									<option
										value={course?._id}
										style={{ background: '#ffffff1e' }}
										selected={type === 'edit' && exam?.course === course?._id}
									>
										{course?.name}
									</option>
								))}
							</select>
							<p className="mb-1 invalid-feedback">{errors?.course?.message}</p>
						</span>
						<span className="col-md-4 px-md-3">
							<label
								for="date"
								className="text-light text-capitalize fw-bold d-block"
							>
								date
							</label>
							<input
								type="datetime-local"
								className={`form-select bg-secondary bg-opacity-25 text-light w-100 rounded ${
									touchedFields?.date && (!errors.date ? ' is-valid' : '')
								}
								${errors.date ? ' is-invalid' : ''}
								`}
								{...register('date')}
							/>
							<p className="mb-1 invalid-feedback">{errors?.date?.message}</p>
						</span>
						<span className="col-md-4 px-md-3">
							<label
								for="duration"
								className="text-light text-capitalize fw-bold d-block"
							>
								duration
							</label>
							<input
								type="text"
								placeholder="2 hours"
								className={`form-control bg-secondary bg-opacity-25 text-light w-100 rounded ${
									touchedFields?.duration &&
									(!errors.duration ? ' is-valid' : '')
								}
								${errors.duration ? ' is-invalid' : ''}
								`}
								{...register('duration')}
							/>
							<p className="mb-1 invalid-feedback">{errors?.duration?.message}</p>
						</span>
						<span className="col-md-8 px-md-3">
							<label
								for="link"
								className="text-light text-capitalize fw-bold d-block"
							>
								link
							</label>
							<input
								type="url"
								className={`form-control bg-secondary bg-opacity-25 text-light w-100 rounded ${
									touchedFields?.link && (!errors.link ? ' is-valid' : '')
								}
								${errors.link ? ' is-invalid' : ''}
								`}
								{...register('link')}
							/>
							<p className="mb-1 invalid-feedback">{errors?.link?.message}</p>
						</span>
					</div>
					<span className="row d-flex justify-content-end my-5 m-2  px-md-0">
						<button
							className="col-sm-10 col-md-1 rounded border-0 text-uppercase course_button bg-secondary text-light px-1 py-2 font-weight-bold mx-md-3 my-2"
							style={{ fontWeight: '300' }}
							onClick={() => {
								reset();
								navigate('/instructorPanel');
							}}
						>
							cancel
						</button>
						<button
							type="submit"
							className="col-sm-10 col-md-1 rounded border-0 text-uppercase course_button text-light px-1 py-2  font-weight-bold my-2"
							style={{ fontWeight: '300' }}
							disabled={isSubmitting || loading}
							onClick={() => setValue('isPublished', false)}
						>
							save
						</button>
					</span>
				</form>
			</div>

			<Footer />
		</>
	);
}
export default Addexam;
