import { batchJoinQuery, createNewBatchQuery, deleteBatchQuery, fetchBatchQuery, updateBatchQuery } from "../sql/batchQueries.js";
import { poolrequest, sql } from "../utilis/connect.js";

export const createNewBatchService = async (batch) => {
    try {
        const result = await poolrequest()
            .input('batchId', sql.VarChar, batch.batchId)
            .input('userId', sql.VarChar, batch.userId)
            .input('receivedDate', sql.Date, batch.receivedDate)
            .input('totalEggs', sql.Int, batch.totalEggs)
            .input('totalPrice', sql.Decimal, batch.totalPrice)
            .input('batchStatus', sql.VarChar, batch.batchStatus)
            .query(createNewBatchQuery);

        return result;

    } catch (error) {
        return error;
    };
};

export const fetchBatchesService = async (params) => {
    let query;

    if (!params) {
        query = fetchBatchQuery;
    } else {
        if (params.batchId) {
            query = fetchBatchQuery + `WHERE batchId = '${params.batchId}'`;
        };

        if (params.userId) {
            query = fetchBatchQuery + `WHERE userId = '${params.userId}'`;
        };

        if (params.receivedDate) {
            query = fetchBatchQuery + `WHERE receivedDate = '${params.receivedDate}'`;
        };

        if (params.batchStatus) {
            query = fetchBatchQuery + `WHERE batchStatus = '${params.batchStatus}'`;
        };

    };

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};

export const fetchUJBatchesService = async (params) => {
    let query;

    if (!params) {
        query = batchJoinQuery;
    } else {
        if (params.batchId) {
            query = batchJoinQuery + `WHERE batchId = '${params.batchId}'`;
        };

        if (params.userId) {
            query = batchJoinQuery + `WHERE userId = '${params.userId}'`;
        };

        if (params.receivedDate) {
            query = batchJoinQuery + `WHERE receivedDate = '${params.receivedDate}'`;
        };

        if (params.batchStatus) {
            query = batchJoinQuery + `WHERE batchStatus = '${params.batchStatus}'`;
        };
    };

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};

export const updateBatchService = async ({ batchId }, params) => {
    let query = updateBatchQuery(batchId, params);

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};

export const deleteBatchService = async ({ batchId }) => {
    let query = deleteBatchQuery + `WHERE batchId = '${batchId}'`;

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};