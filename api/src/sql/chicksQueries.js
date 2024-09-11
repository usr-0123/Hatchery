export const createNewChickQuery = `INSERT INTO tbl_Chicks (chickId, batchId, hatchRecordId, chickType, quantity, healthStatus)
VALUES (@chickId, @batchId, @hatchRecordId, @chickType, @quantity, @healthStatus)`;

export const fetchChicksQuery = `SELECT * FROM tbl_Chicks `;

export const updateChicksQuery = (chickId, params) => {
    const queryFields = Object.keys(params).map(key => `${key} = '${params[key]}'`).join(', ')
    const query = `UPDATE tbl_Chicks SET ${queryFields} WHERE chickId = '${chickId}'`
    return query;
};

export const deleteChicksQuery = `DELETE FROM tbl_Chicks `;
