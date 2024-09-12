import dotenv from 'dotenv';
import { poolrequest, sql } from '../utilis/connect.js';
import { deleteUserQuery, fetchAllUsersDetailsQuery, fetchUsersQuery, registerUserQuery, updateUserQuery } from '../sql/usersQueries.js';

dotenv.config();

export const registerUserService = async (user) => {
    try {
        const result = await poolrequest()
            .input('userId', sql.VarChar, user.userId)
            .input('firstName', sql.VarChar, user.firstName)
            .input('lastName', sql.VarChar, user.lastName)
            .input('surName', sql.VarChar, user.surName)
            .input('userName', sql.VarChar, user.userName)
            .input('userEmail', sql.VarChar, user.userEmail)
            .input('userPassword', sql.VarChar, user.userPassword)
            .input('userPhoneNumber', sql.VarChar, user.userPhoneNumber)
            .input('userStreet', sql.VarChar, user.userStreet)
            .input('userLocation', sql.VarChar, user.userLocation)
            .input('membershipDate', sql.Date, user.membershipDate)
            .query(registerUserQuery);

        return result;

    } catch (error) {
        return error;
    };
};

export const fetchUsersService = async (params) => {

    let query;

    if (!params) {
        query = fetchUsersQuery;
    } else {
        if (params.userId) {
            query = fetchUsersQuery + ` WHERE userId = '${params.userId}'`;
        };

        if (params.userStreet) {
            query = fetchUsersQuery + ` WHERE userStreet = '${params.userStreet}'`;
        };

        if (params.userLocation) {
            query = fetchUsersQuery + ` WHERE userLocation = '${params.userLocation}'`;
        };

        if (params.membershipDate) {
            query = fetchUsersQuery + ` WHERE membershipDate = '${params.membershipDate}'`;
        };

        if (params.userEmail) {
            if (params.userEmail && params.userPassword) {
                query = fetchAllUsersDetailsQuery + ` WHERE userEmail = '${params.userEmail}'`;
            } else {
                query = fetchUsersQuery + ` WHERE userEmail = '${params.userEmail}'`;
            };
        };

        if (params.userName) {
            if (params.userName && params.userPassword) {
                query = fetchAllUsersDetailsQuery + ` WHERE userName = '${params.userName}'`;
            } else {
                query = fetchUsersQuery + ` WHERE userName = '${params.userName}'`;
            };
        };

        if (params.userPhoneNumber) {
            if (params.userName && params.userPhoneNumber) {
                query = fetchAllUsersDetailsQuery + ` WHERE userPhoneNumber = '${params.userPhoneNumber}'`;
            } else {
                query = fetchUsersQuery + ` WHERE userPhoneNumber = '${params.userPhoneNumber}'`;
            };
        };
    };

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};

export const updateUserService = async ({ userId }, params) => {

    let query = updateUserQuery(userId, params)

    try {
        const result = await poolrequest().query(query)
        return result
    } catch (error) {
        return error
    }
};

export const deleteUserService = async ({ userId }) => {

    let query = deleteUserQuery(userId);

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};