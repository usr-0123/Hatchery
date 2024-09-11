export const createNewIncubationQuery = `INSERT INTO tbl_incubation (incubationId, batchId, startDate, hatchDate, IncubationState)
VALUES (@incubationId, @batchId, @startDate, @hatchDate, @IncubationState)`;

export const fetchIncubationsQuery = `SELECT * FROM tbl_incubation `;

export const updateincubationQuery = (incubationId, params) => {
    const queryFields = Object.keys(params).map(key => `${key} = '${params[key]}'`).join(', ')
    const query = `UPDATE tbl_incubation SET ${queryFields} WHERE incubationId = '${incubationId}'`
    return query;
};

export const deleteIncubationsQuery = `DELETE FROM tbl_incubation `;
