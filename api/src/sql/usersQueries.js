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

`CREATE PROCEDURE DeleteUserAndUpdateReferences
    @userId VARCHAR(255)
AS
BEGIN
    -- Start a transaction to ensure atomicity
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Update references in tbl_batches
        UPDATE tbl_batches
        SET userId = NULL
        WHERE userId = @userId;

        -- Update references in tbl_eggs
        UPDATE tbl_eggs
        SET userId = NULL
        WHERE userId = @userId;

        -- Update references in tbl_Users if any other tables have foreign key constraints
        -- Here we assume no other tables have userId foreign key constraints that need to be updated

        -- Delete the user entry from tbl_Users
        DELETE FROM tbl_Users
        WHERE userId = @userId;

        -- Commit the transaction if all operations succeed
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback the transaction if any error occurs
        ROLLBACK TRANSACTION;

        -- Optionally, raise an error message
        THROW;
    END CATCH;
END;`
