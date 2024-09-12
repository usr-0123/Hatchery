export const createNewSaleQuery = `INSERT INTO tbl_sales (saleId, batchId, chickId, saleDate, quantitySold, chickPrice, totalAmount)
VALUES (@saleId, @batchId, @chickId, @saleDate, @quantitySold, @chickPrice, @totalAmount)`;

export const fetchSalesQuery = `SELECT * FROM tbl_sales `;

export const updateSalesQuery = (saleId, params) => {
    const queryFields = Object.keys(params).map(key => `${key} = '${params[key]}'`).join(', ')
    const query = `UPDATE tbl_Sales SET ${queryFields} WHERE saleId = '${saleId}'`
    return query;
};

export const deleteSalesQuery = `DELETE FROM tbl_sales `;
