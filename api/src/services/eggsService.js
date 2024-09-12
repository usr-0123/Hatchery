import { createNewEggQuery, deleteEggQuery, fetchEggsQuery, updateEggsQuery } from "../sql/eggsQueries.js";
import { poolrequest, sql } from "../utilis/connect.js";

export const createNewEggService = async (egg) => {

    try {
        const result = await poolrequest()
            .input('eggId', sql.VarChar, egg.eggId)
            .input('userId', sql.VarChar, egg.userId)
            .input('batchId', sql.VarChar, egg.batchId)
            .input('collectionDate', sql.Date, egg.collectionDate)
            .input('eggsQuantity', sql.Int, egg.eggsQuantity)
            .query(createNewEggQuery);

        return result;
    } catch (error) {
        return error;
    };
};

export const fetchEggsService = async (params) => {
    let query;
    
    if (!params) {
        query = fetchEggsQuery;
    } else {
        if (params.eggId) {
            query = fetchEggsQuery + `WHERE eggId = '${params.eggId}'`;
        };
        
        if (params.batchId) {
            query = fetchEggsQuery + `WHERE batchId = '${params.batchId}'`;
        };

        if (params.userId) {
            query = fetchEggsQuery + `WHERE userId = '${params.userId}'`;
        };
        
        if (params.collectionDate) {
            query = fetchEggsQuery + `WHERE collectionDate = '${params.collectionDate}'`;
        };
    };

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};

export const updateEggsService = async ({ eggId }, params) => {
    let query = updateEggsQuery(eggId, params);

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};

export const deleteEggService = async ({ eggId }) => {
    let query = deleteEggQuery + `WHERE eggId = '${eggId}'`;

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};