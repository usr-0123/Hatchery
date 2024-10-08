import Joi from "joi";

export const registerUserValidator = (user) => {
    const userValidationSchema = Joi.object({
        firstName: Joi.string().max(255).required(),
        lastName: Joi.string().max(255).required(),
        userEmail: Joi.string().email().required(),
        userPassword: Joi
            .string()
            .min(8)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            .message('The password should have a minimum length of 8 characters, at least one uppercase letter, at least one lowercase letter, at least one digit, and at least one special character.')
            .required(),
    });

    return userValidationSchema.validate(user);
};