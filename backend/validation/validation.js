import Joi from "joi";

// Common schema definitions for reusability
const emailSchema = Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .label('Email')
    .messages({
        "any.required": "Missing required email field",
        "string.email": "Invalid email format",
    });

const passwordSchema = Joi.string()
    .min(6)
    .max(16)
    .required()
    .label('Password')
    .messages({
        "any.required": "Missing required password field",
        "string.min": "Password must be at least 6 characters long",
        "string.max": "Password must be at most 16 characters long",
    });

// Calorie Intake Validation Schema
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
        .required()
        .positive()
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
});

// Login Validation Schema
const loginValidation = Joi.object({
    email: emailSchema,
    password: passwordSchema,
});

// Registration Validation Schema
const registrationValidation = Joi.object({
    name: Joi.string()
        .required()
        .label('Name')
        .messages({
            "any.required": "Missing required name field",
        }),
    email: emailSchema,
    password: passwordSchema,
});

export { calorieIntakeValidation, loginValidation, registrationValidation };
