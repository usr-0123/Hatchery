import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import { conflict, dataFound, sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, unAuthorized } from "../helpers/httpStatusCodes.js";
import { registerUserValidator } from "../validators/userValidators.js";
import { formatNameCase } from '../helpers/helperFunctions.js';
import { deleteUserService, fetchUsersService, registerUserService, updateUserService } from '../services/usersServices.js';
import { sendMail } from '../email/emailTemp.js';

export const registerUserController = async (req, res) => {
    try {
        let permission = false;

        const editor = await fetchUsersService({ userId: req.params.editorId });

        if (editor?.recordset?.length > 0 && editor.recordset[0].userRole === 'Admin') {
            permission = true;
        };

        if (!permission) {
            return unAuthorized(res, "You are not allowed to register a new account.");
        };

        const { firstName, lastName, userEmail, userPassword } = req.body;
        const validation = registerUserValidator({ firstName, lastName, userEmail, userPassword });

        if (validation.error) {
            return sendServerError(res, validation.error.message);
        } else {
            const { firstName, lastName, surName, userName, userEmail, userPassword, userPhoneNumber, userStreet, userLocation } = req.body;

            const userEmailExists = await fetchUsersService({ userEmail: userEmail });
            const userNameExists = await fetchUsersService({ userName: userName });
            const userPhoneExists = await fetchUsersService({ userPhoneNumber: userPhoneNumber });

            if (userEmailExists.recordset && +userEmailExists.recordset.length > 0) {
                return conflict(res, 'Email address already registered.');
            } else if (userNameExists.recordset && +userNameExists.recordset.length > 0) {
                return conflict(res, 'Username already registered.');
            } else if (userPhoneExists.recordset && +userPhoneExists.recordset.length > 0) {
                return conflict(res, 'Phone number already registered.');
            } else {
                const userId = v4();

                const hashedUserPassword = await bcrypt.hash(userPassword, 8);

                const registrationDate = new Date();

                const user = {
                    userId,
                    firstName: formatNameCase(firstName),
                    lastName: formatNameCase(lastName),
                    surName: surName ? formatNameCase(surName) : null,
                    userName: userName?.toLowerCase(),
                    userEmail: userEmail?.toLowerCase(),
                    userPassword: hashedUserPassword,
                    userPhoneNumber,
                    userStreet,
                    userLocation,
                    membershipDate: registrationDate
                };

                const result = await registerUserService(user);

                if (result.message) {
                    sendServerError(res, result.message);
                } else {
                    if (result.rowsAffected == 1) {
                        const mailOptions = {
                            option: 'register',
                            Email_address: user.userEmail,
                            data: user.surName ? `${user.firstName} ${user.lastName} ${user.surName}` : `${user.firstName} ${user.lastName}`
                        };

                        await sendMail(mailOptions);

                        sendCreated(res, 'Employee created successfully');
                    };
                };
            };
        };

    } catch (error) {
        return sendServerError(res, `Error: ${error.message}`);
    };
};

export const loginUserController = async (req, res) => {

    try {
        const user = await fetchUsersService(req.body);

        if (user && user.recordset.length < 1) {
            return sendNotFound(res, 'No user found with the details provided.')
        } else {

            const valid = await bcrypt.compare(req.body.userPassword, user.recordset[0].userPassword);

            if (valid) {
                const token = jwt.sign({
                    userId: user.recordset[0].userId,
                    userRole: user.recordset[0].userRole,
                    userEmail: user.recordset[0].userEmail,
                    userName: user.recordset[0].userName,
                    firstName: user.recordset[0].firstName,
                    lastName: user.recordset[0].lastName,
                    surName: user.recordset[0].surName ? user.recordset[0].surName : '',
                    userPhoneNumber: user.recordset[0].userPhoneNumber ? user.recordset[0].userPhoneNumber : '',
                    userStreet: user.recordset[0].userStreet ? user.recordset[0].userStreet : '',
                    userLocation: user.recordset[0].userLocation ? user.recordset[0].userLocation : '',
                    membershipDate: user.recordset[0].membershipDate ? user.recordset[0].membershipDate : ''
                }, process.env.JWT_SECRET, { expiresIn: "6h" });

                const mailOptions = {
                    option: 'login',
                    Email_address: user.recordset[0].userEmail,
                    data: user.surName ? `${user.firstName} ${user.lastName} ${user.surName}` : `${user.firstName} ${user.lastName}`
                };

                sendMail(mailOptions);

                return dataFound(res, token, 'Login successful');
            } else {
                return sendNotFound(res, 'Wrong login credentials');
            };
        };
    } catch (error) {
        return sendServerError(res, `Error: ${error.message}`);
    };
};

export const fetchUsersController = async (req, res) => {

    try {
        const result = await fetchUsersService();

        if (result.recordset) {
            let fetchMessage = '';

            if (result.rowsAffected > 0) {
                fetchMessage = 'All users records fetched.';
            } else {
                fetchMessage = 'No records available at the moment.';
            };

            return dataFound(res, result.recordset, fetchMessage);
        };


    } catch (error) {
        return sendServerError(res, error);
    };
};

export const fechUserbyUserStreetController = async (req, res) => {
    try {
        const result = await fetchUsersService(req.params);

        if (result.recordset) {
            let fetchMessage = '';

            if (result.rowsAffected > 0) {
                fetchMessage = 'All users records fetched.';
            } else {
                fetchMessage = 'No records available at the moment.';
            };

            return dataFound(res, result.recordset, fetchMessage);
        };

    } catch (error) {
        return sendServerError(res, error);
    };
};

export const fechUserbylocationController = async (req, res) => {
    try {
        const result = await fetchUsersService(req.params);

        if (result.recordset) {
            let fetchMessage = '';

            if (result.rowsAffected > 0) {
                fetchMessage = 'All users records fetched.';
            } else {
                fetchMessage = 'No records available at the moment.';
            };

            return dataFound(res, result.recordset, fetchMessage);
        };

    } catch (error) {
        return sendServerError(res, error);
    };
};

export const fechUserbyMembershipdateController = async (req, res) => {
    try {
        const result = await fetchUsersService(req.params);

        if (result.recordset) {
            let fetchMessage = '';

            if (result.rowsAffected > 0) {
                fetchMessage = 'All users records fetched.';
            } else {
                fetchMessage = 'No records available at the moment.';
            };

            return dataFound(res, result.recordset, fetchMessage);
        };

    } catch (error) {
        return sendServerError(res, error);
    };
};

export const fechUserbyUserIdController = async (req, res) => {
    try {
        const result = await fetchUsersService(req.params);

        if (result.recordset) {
            if (result.rowsAffected > 0) {
                return dataFound(res, result.recordset, `User data entry fetched successfuly.`)
            } else {
                return sendNotFound(res, `No user records found for this entry.`)
            };
        };

    } catch (error) {
        return sendServerError(res, error);
    };
};

export const fechUserbyUserEmailController = async (req, res) => {
    try {
        const result = await fetchUsersService(req.params);

        if (result.recordset) {
            if (result.rowsAffected > 0) {
                return dataFound(res, result.recordset, `User data entry fetched successfuly.`)
            } else {
                return sendNotFound(res, `No user records found for this entry.`)
            };
        };

    } catch (error) {
        return sendServerError(res, error);
    };
};

export const fechUserbyUsernameController = async (req, res) => {
    try {
        const result = await fetchUsersService(req.params);

        if (result.recordset) {
            if (result.rowsAffected > 0) {
                return dataFound(res, result.recordset, `User data entry fetched successfuly.`)
            } else {
                return sendNotFound(res, `No user records found for this entry.`)
            };
        };

    } catch (error) {
        return sendServerError(res, error);
    };
};

export const fechUserbyPhoneNumberController = async (req, res) => {
    try {
        const result = await fetchUsersService(req.params);

        if (result.recordset) {
            if (result.rowsAffected > 0) {
                return dataFound(res, result.recordset, `User data entry fetched successfuly.`)
            } else {
                return sendNotFound(res, `No user records found for this entry.`)
            };
        };

    } catch (error) {
        return sendServerError(res, error);
    };
};

export const updateUserDetailsController = async (req, res) => {

    let permission = false;

    if (req.params.editorId === req.params.userId) {
        permission = true;
    } else {
        const editor = await fetchUsersService({ userId: req.params.editorId });
        if (editor?.recordset?.length > 0 && editor.recordset[0].userRole === 'Admin') {
            permission = true;
        };
    };

    const availableEntry = await fetchUsersService(req.params);

    if (availableEntry.recordset.length > 0) {

        if (permission) {
            try {
                const result = await updateUserService(req.params, req.body);
                
                if (result.rowsAffected > 0) {

                    const mailOptions = {
                        option: 'update',
                        Email_address: availableEntry.recordset[0].userEmail,
                        data: availableEntry.surName ? `${availableEntry.firstName} ${availableEntry.lastName} ${availableEntry.surName}` : `${availableEntry.firstName} ${availableEntry.lastName}`
                    };

                    sendMail(mailOptions);

                    return dataFound(res, result.recordset, `User record updated successfully`);
                } else {
                    return sendBadRequest(res, `User details not updated!`)
                }

            } catch (error) {
                return sendServerError(res, error);
            };
        } else {
            return unAuthorized(res, 'You are not allowed to edit this record.')
        };

    } else {
        return sendNotFound(res, 'No user record to update was found');
    };
};

export const deleteUserController = async (req, res) => {

    let permission = false;

    if (req.params.editorId === req.params.userId) {
        permission = true;
    } else {
        const editor = await fetchUsersService({ userId: req.params.editorId });
        
        if (editor.recordset && editor.recordset.length > 0 && editor.recordset[0].userRole === 'Admin') {
            permission = true;
        };
    };

    const availableEntry = await fetchUsersService(req.params);

    if (availableEntry.recordset.length > 0) {

        if (permission) {
            try {
                const result = await deleteUserService(req.params);

                if (result.rowsAffected > 0) {

                    const mailOptions = {
                        option: 'delete',
                        Email_address: availableEntry.recordset[0].userEmail,
                        data: availableEntry.surName ? `${availableEntry.firstName} ${availableEntry.lastName} ${availableEntry.surName}` : `${availableEntry.firstName} ${availableEntry.lastName}`
                    };

                    sendMail(mailOptions);

                    return sendDeleteSuccess(res, 'User deleted successfully');
                } else {
                    return sendServerError(res, 'There was a problem occurred while deleting record');
                };

            } catch (error) {
                sendServerError(res, error);
            };
        } else {
            return unAuthorized(res, 'You are not allowed to manipulate this entry record.')
        };

    } else {
        return sendNotFound(res, 'No user record to delete was found');
    };
};