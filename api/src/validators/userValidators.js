import Joi from "joi";

//             .input('userRole', sql.VarChar, user.userRole)
//             .input('firstName', sql.VarChar, user.firstName)
//             .input('lastName', sql.VarChar, user.lastName)
//             .input('surName', sql.VarChar, user.surName)
//             .input('userName', sql.VarChar, user.userName)
//             .input('userEmail', sql.VarChar, user.userEmail)
//             .input('userPassword', sql.VarChar, user.userPassword)
//             .input('userPhoneNumber', sql.VarChar, user.userPhoneNumber)
//             .input('userStreet', sql.VarChar, user.userStreet)
//             .input('userLocation', sql.VarChar, user.userLocation)
//             .input('membershipDate', sql.Date, user.membershipDate)

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