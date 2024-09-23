import { createNewSaleQuery, deleteSalesQuery, fetchSalesQuery, updateSalesQuery } from "../sql/salesQueries.js";
import { poolrequest, sql } from "../utilis/connect.js";

export const createNewSaleService = async (params) => {

    try {
        const result = await poolrequest()
            .input('saleId', sql.VarChar, params.saleId)
            .input('saleDate', sql.Date, params.saleDate)
            .input('quantitySold', sql.Int, params.quantitySold)
            .input('price', sql.Decimal, params.price)
            .input('totalAmount', sql.Decimal, params.totalAmount)

            .query(createNewSaleQuery);

        return result;
    } catch (error) {
        return error;
    };
};

export const fetchSalesService = async (params) => {
    let query;

    if (!params) {
        query = fetchSalesQuery;
    } else {
        if (params.saleId) {
            query = fetchSalesQuery + `WHERE saleId = '${params.saleId}'`;
        };

        if (params.saleDate) {
            query = fetchSalesQuery + `WHERE saleDate = '${params.saleDate}'`;
        };
    };

    try {
        const result = await poolrequest().query(query);
        
        return result;
    } catch (error) {
        return error;
    };
};

export const updateSalesService = async ({ saleId }, params) => {
    let query = updateSalesQuery(saleId, params);
    
    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};

export const deleteSalesService = async ({ saleId }) => {
    let query = deleteSalesQuery + `WHERE saleId = '${saleId}'`;

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};