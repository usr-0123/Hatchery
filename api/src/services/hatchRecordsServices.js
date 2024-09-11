import { createNewHatchRecordQuery, deleteHatchRecordQuery, fetchHatchRecordsQuery, updateHatchQuery } from "../sql/hatchRecordsQueries.js";
import { poolrequest, sql } from "../utilis/connect.js";

export const createNewHatchRecordService = async (params) => {

    try {
        const result = await poolrequest()
            .input('hatchRecordId', sql.VarChar, params.hatchRecordId)
            .input('batchId', sql.VarChar, params.batchId)
            .input('hatchedChicks', sql.Int, params.hatchedChicks)
            .input('unHatchedEggs', sql.Int, params.unHatchedEggs)
            .input('dateHatched', sql.Date, params.dateHatched)
            .query(createNewHatchRecordQuery);

        return result;
    } catch (error) {
        return error;
    };
};

export const fetchHatchRecordsService = async (params) => {
    let query;

    if (!query) {
        query = fetchHatchRecordsQuery;
    } else {
        if (params.hatchRecordId) {
            query = fetchHatchRecordsQuery + `WHERE hatchRecordId = '${params.hatchRecordId}'`;
        };
        if (params.batchId) {
            query = fetchHatchRecordsQuery + `WHERE batchId = '${params.batchId}'`;
        };

        if (params.dateHatched) {
            query = fetchHatchRecordsQuery + `WHERE dateHatched = '${params.dateHatched}'`;
        };
    };

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};

export const updateHatchService = async ({ hatchRecordId }, params) => {
    let query = updateHatchQuery(hatchRecordId, params);

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};

export const deleteHatchRecordService = async ({ hatchRecordId }) => {
    let query = deleteHatchRecordQuery + `WHERE hatchRecordId = '${hatchRecordId}'`;

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};