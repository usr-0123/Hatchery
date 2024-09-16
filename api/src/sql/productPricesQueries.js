export const createNewProductPriceQuery = `INSERT INTO tbl_ProductPrices (productPriceId, product_name, price, currency, date_updated) VALUES (@productPriceId, @product_name, @price, @currency, @date_updated)`;

export const fetchProductPriceQuery = `SELECT * FROM tbl_ProductPrices `;

export const updateProductPriceQuery = (productPriceId, params) => {
    const queryFields = Object.keys(params).map(key => `${key} = '${params[key]}'`).join(', ')
    const query = `UPDATE tbl_ProductPrices SET ${queryFields} WHERE productPriceId = '${productPriceId}'`
    return query;
};

export const deleteProductPriceQuery = `DELETE FROM tbl_ProductPrices `;