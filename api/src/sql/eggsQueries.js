export const createNewEggQuery = `INSERT INTO tbl_eggs (eggId, userId, batchId, collectionDate, eggsQuantity)
VALUES (@eggId, @userId, @batchId, @collectionDate, @eggsQuantity)`;

export const fetchEggsQuery = `SELECT * FROM tbl_eggs `;

export const updateEggsQuery = (eggId, params) => {
    const queryFields = Object.keys(params).map(key => `${key} = '${params[key]}'`).join(', ')
    const query = `UPDATE tbl_eggs SET ${queryFields} WHERE eggId = '${eggId}'`
    return query;
};

export const deleteEggQuery = `DELETE FROM tbl_eggs `;
