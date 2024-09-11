export const createNewHatchRecordQuery = `INSERT INTO tbl_Hatchrecords (hatchRecordId, batchId, hatchedChicks, unHatchedEggs, dateHatched)
VALUES (@hatchRecordId, @batchId, @hatchedChicks, @unHatchedEggs, @dateHatched)`;

export const fetchHatchRecordsQuery = `SELECT * FROM tbl_Hatchrecords `;

export const updateHatchQuery = (hatchRecordId, params) => {
    const queryFields = Object.keys(params).map(key => `${key} = '${params[key]}'`).join(', ')
    const query = `UPDATE tbl_Hatchrecords SET ${queryFields} WHERE hatchRecordId = '${hatchRecordId}'`
    return query;
};

export const deleteHatchRecordQuery = `DELETE FROM tbl_Hatchrecords `;
