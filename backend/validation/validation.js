import Joi from "joi";

const calorieIntakeValidation = Joi.object({
    height: Joi.number()
        .required()
        .positive()
        .label('Height'),
    desiredWeight: Joi.number()
        .required()
        .positive()
        .label('Desired Weight'),
    age: Joi.number()
        .required().positive()
        .integer()
        .label('Age'),
    bloodType: Joi.number()
        .required()
        .valid(1, 2, 3, 4)
        .label('Blood Type'),
    currentWeight: Joi.number()
        .required()
        .positive()
        .label('Current Weight'),
})

const loginValidation = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .email()
        .label('Email')
            .messages({
            "any.required": "Missing required email field",
            "string.email": "Invalid email format",
        }),
    password: Joi.string()
        .min(6)
        .max(16)
        .required()
        .label('Password')
        .messages({
            "any.required": "Missing required password field",
            "string.min": "Password must be at least 6 characters long",
            "string.max": "Password must be at most 16 characters long",
        }),
})

//REGISTRATION VALIDAION
const registrationValidation = Joi.object({
    name: Joi.string()
        .required()
        .label('Name')
        .messages({
            "any.required": "Missing required name field",
        }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .label('Email')
            .messages({
            "any.required": "Missing required email field",
            "string.email": "Invalid email format",
            }),
    password: Joi.string()
        .min(6)
        .max(16)
        .required()
        .label('Password')
        .messages({
            "any.required": "Missing required password field",
            "string.min": "Password must be at least 6 characters long",
            "string.max": "Password must be at most 16 characters long",
        }),
})


export { calorieIntakeValidation, loginValidation, registrationValidation }
