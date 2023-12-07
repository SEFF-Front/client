import Joi from 'joi';

export const newCertificateValidation = Joi.object({
	certificate_file: Joi.alternatives()
		.try(Joi.string(), Joi.object())
		.required()
		.messages({
			'any.required': 'Please select the certificate file',
		}),
	acquired_date: Joi.date()
		.required()
		.messages({ 'any.required': 'Please select the start date' }),

	course: Joi.string().required().messages({
		'any.required': 'Please select the course',
	}),

	student: Joi.string().required().messages({
		'any.required': 'Please select the Student',
	}),

	upload_date: Joi.date(),
});

export const updateCertificateValidation = Joi.object({
	certificate_file: Joi.any(),
	acquired_date: Joi.date(),
	student: Joi.string(),
	course: Joi.string(),
	upload_date: Joi.date(),
});
