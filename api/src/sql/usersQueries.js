export const registerUserQuery = `INSERT INTO tbl_Users (userId, firstName, lastName, surName, userName, userEmail, userPassword, userPhoneNumber, userStreet, userLocation, membershipDate)
VALUES ( @userId, @firstName, @lastName, @surName, @userName, @userEmail, @userPassword, @userPhoneNumber, @userStreet, @userLocation, @membershipDate )`;

export const fetchAllUsersDetailsQuery = `SELECT * FROM tbl_Users`;

export const fetchUsersQuery = `SELECT userId, userRole, firstName, lastName, surName, userName, userEmail, userPhoneNumber, userStreet, userLocation, membershipDate FROM tbl_Users`;

export const updateUserQuery = (userId, params) => {
    const queryFields = Object.keys(params).map(key => `${key} = '${params[key]}'`).join(', ')
    const query = `UPDATE tbl_Users SET ${queryFields} WHERE userId = '${userId}'`
    return query;
};

export const deleteUserQuery = (userId) => {
    const query = `DELETE FROM tbl_Users WHERE userId = '${userId}'`
    return query;
};