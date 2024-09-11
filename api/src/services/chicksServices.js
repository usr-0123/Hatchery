import { createNewChickQuery, deleteChicksQuery, fetchChicksQuery, updateChicksQuery } from "../sql/chicksQueries.js";
import { poolrequest, sql } from "../utilis/connect.js";

export const createNewHatchRecordService = async (params) => {

    try {
        const result = await poolrequest()
            .input('chickId', sql.VarChar, params.chickId)
            .input('batchId', sql.VarChar, params.batchId)
            .input('hatchRecordId', sql.VarChar, params.hatchRecordId)
            .input('chickType', sql.VarChar, params.chickType)
            .input('quantity', sql.Int, params.quantity)
            .input('healthStatus', sql.Int, params.healthStatus)

            .query(createNewChickQuery);

        return result;
    } catch (error) {
        return error;
    };
};

export const fetchChicksQueryService = async (params) => {
    let query;

    if (!query) {
        query = fetchChicksQuery;
    } else {
        if (params.chickId) {
            query = fetchChicksQuery + `WHERE chickId = '${params.chickId}'`;
        };

        if (params.batchId) {
            query = fetchChicksQuery + `WHERE batchId = '${params.batchId}'`;
        };

        if (params.hatchRecordId) {
            query = fetchChicksQuery + `WHERE hatchRecordId = '${params.hatchRecordId}'`;
        };

        if (params.chickType) {
            query = fetchChicksQuery + `WHERE chickType = '${params.chickType}'`;
        };

        if (params.healthStatus) {
            query = fetchChicksQuery + `WHERE healthStatus = '${params.healthStatus}'`;
        };
    };

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};

export const updateChicksService = async ({ chickId }, params) => {
    let query = updateChicksQuery(chickId, params);

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};

export const deleteChicksService = async ({ chickId }) => {
    let query = deleteChicksQuery + `WHERE chickId = '${chickId}'`;

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};