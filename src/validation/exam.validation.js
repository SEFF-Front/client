import Joi from 'joi';
import { enum_examsStatus } from '../utils/config/enums';

export const newExamValidation = Joi.object({
	date: Joi.date().required().messages({
		'any.required': 'Please provide a duration for this Exam',
		'string.base': 'Please provide a duration for this Exam',
	}),
	duration: Joi.string().required().messages({
		'any.required': 'Please provide a duration for this Exam',
	}),

	link: Joi.string().uri().required().messages({
		required: 'Please provide a duration for this Exam',
	}),
	// photo: Joi.string(),

	isPublished: Joi.boolean()
		.required()
		.messages({ 'any.required': 'please provide the exam published or draft' }),

	status: Joi.string()
		.valid(...enum_examsStatus)
		// .default(enum_examsStatus[0])
		.trim()
		.messages({
			'any.only': `Must be one of the following values: ${enum_examsStatus}`,
		}),

	// --------------------------------------
	course: Joi.string()
		.required()
		// .error(()=>'Please select the course'),
		.messages({ 'any.required': 'Please select the course' }),
	Instructor: Joi.string()
		.required()
		.messages({ 'any.required': 'Please select the Instructor' }),
});

export const updateExamValidation = Joi.object({
	date: Joi.date(),

	duration: Joi.string(),

	link: Joi.string().uri(),

	// photo: Joi.string(),

	isPublished: Joi.boolean(),

	status: Joi.string()
		.valid(...enum_examsStatus)
		.trim()
		.messages({
			'any.only': `Must be one of the following values: ${enum_examsStatus}`,
		}),
	// --------------------------------------
	course: Joi.string(),

	Instructor: Joi.string(),
});
