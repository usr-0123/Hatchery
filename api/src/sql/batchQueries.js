export const createNewBatchQuery = `INSERT INTO tbl_batches (batchId, userId, receivedDate, totalEggs, batchStatus)
VALUES (@batchId, @userId, @receivedDate, @totalEggs, @batchStatus)`;

export const fetchBatchQuery = `SELECT * FROM tbl_batches `;

export const batchJoinQuery = `SELECT 
    u.userId, 
    u.firstName, 
    u.lastName, 
    u.surName, 
    u.userEmail, 
    u.userPhoneNumber, 
    u.userLocation, 
    u.membershipDate,
    b.batchId, 
    b.receivedDate, 
    b.totalEggs, 
    b.batchStatus
FROM tbl_Users u
JOIN tbl_Batches b
    ON u.userId = b.userId;
`

export const updateBatchQuery = (batchId, params) => {
    const queryFields = Object.keys(params).map(key => `${key} = '${params[key]}'`).join(', ')
    const query = `UPDATE tbl_batches SET ${queryFields} WHERE batchId = '${batchId}'`
    return query;
};

export const deleteBatchQuery = `DELETE FROM tbl_batches `;