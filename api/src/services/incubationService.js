import { createNewIncubationQuery, deleteIncubationsQuery, fetchIncubationsQuery, updateincubationQuery } from "../sql/incubationQueries.js";
import { poolrequest, sql } from "../utilis/connect.js";

export const createNewIncubationService = async (params) => {
    try {
        const result = await poolrequest()
            .input('incubationId', sql.VarChar, params.incubationId)
            .input('batchId', sql.VarChar, params.batchId)
            .input('startDate', sql.Date, params.startDate)
            .input('hatchDate', sql.Date, params.hatchDate)
            .input('IncubationState', sql.VarChar, params.IncubationState)
            .query(createNewIncubationQuery);

        return result;
    } catch (error) {
        return error;
    };
};

export const fetchIncubationsService = async (params) => {
    let query;

    if (!query) {
        query = fetchIncubationsQuery;
    } else {
        if (params.incubationId) {
            query = fetchIncubationsQuery + `WHERE incubationId = '${params.incubationId}'`;
        };
        if (params.batchId) {
            query = fetchIncubationsQuery + `WHERE batchId = '${params.batchId}'`;
        };

        if (params.startDate) {
            query = fetchIncubationsQuery + `WHERE startDate = '${params.startDate}'`;
        };

        if (params.hatchDate) {
            query = fetchIncubationsQuery + `WHERE hatchDate = '${params.hatchDate}'`;
        };

        if (params.IncubationState) {
            query = fetchIncubationsQuery + `WHERE IncubationState = '${params.IncubationState}'`;
        };
    };

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};

export const updateincubationService = async ({ incubationId }, params) => {
    let query = updateincubationQuery(incubationId, params);

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};

export const deleteIncubationService = async ({ incubationId }) => {
    let query = deleteIncubationsQuery + `WHERE incubationId = '${incubationId}'`;

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};