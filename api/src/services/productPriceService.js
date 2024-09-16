import { createNewProductPriceQuery, deleteProductPriceQuery, fetchProductPriceQuery, updateProductPriceQuery } from "../sql/productPricesQueries.js";
import { poolrequest, sql } from "../utilis/connect.js";

export const createNewProductPriceService = async (params) => {
    try {
        const result = await poolrequest()
            .input('productPriceId', sql.VarChar, params.productPriceId)
            .input('product_name', sql.VarChar, params.product_name)
            .input('price', sql.Decimal, params.price)
            .input('currency', sql.VarChar, params.currency)
            .input('date_updated', sql.Date, params.date_updated)
            .query(createNewProductPriceQuery);

        return result;
    } catch (error) {
        return error;
    };
};

export const fetchProductPriceService = async (params) => {
    
    let query;

    if (!params) {
        query = fetchProductPriceQuery;
    } else {
        if (params.productPriceId) {
            query = fetchProductPriceQuery + `WHERE productPriceId = '${params.productPriceId}'`;
        };
        if (params.product_name) {
            query = fetchProductPriceQuery + `WHERE product_name = '${params.product_name}'`;
        };

        if (params.price) {
            query = fetchProductPriceQuery + `WHERE price = '${params.price}'`;
        };

        if (params.currency) {
            query = fetchProductPriceQuery + `WHERE currency = '${params.currency}'`;
        };

        if (params.date_updated) {
            query = fetchProductPriceQuery + `WHERE date_updated = '${params.date_updated}'`;
        };
    };

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};

export const updateProductPriceService = async ({ productPriceId }, params) => {
    let query = updateProductPriceQuery(productPriceId, params);

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};

export const deleteProductPriceService = async ({ productPriceId }) => {
    let query = deleteProductPriceQuery + `WHERE productPriceId = '${productPriceId}'`;

    try {
        const result = await poolrequest().query(query);
        return result;
    } catch (error) {
        return error;
    };
};