import { v4 } from "uuid";
import { conflict, dataFound, sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, unAuthorized } from "../helpers/httpStatusCodes.js";
import { createNewProductPriceService, deleteProductPriceService, fetchProductPriceService, updateProductPriceService } from "../services/productPriceService.js";
import { fetchUsersService } from "../services/usersServices.js";

export const createNewProductPriceController = async (req, res) => {
    try {
        const { product_name, price, currency } = req.body;

        const records = await fetchProductPriceService({ product_name });

        if (records.recordset.length > 0) {
            return conflict(res, 'This product already exists.');
        };

        const productPriceId = v4();

        const date_updated = new Date();

        const newProductPrice = { productPriceId, product_name, price, currency, date_updated };

        const result = await createNewProductPriceService(newProductPrice);

        if (result.message) {
            sendServerError(res, result.message);
        } else {
            if (result.rowsAffected[0] > 0) {
                sendCreated(res, 'Product price added successfully.');
            };
        };

    } catch (error) {
        return error;
    };
};

export const fetchProductPriceController = async (req, res) => {
    try {
        const result = await fetchProductPriceService(req.params);

        if (result.recordset) {

            if (result.rowsAffected > 0) {
                return dataFound(res, result.recordset, 'Product price record fetched.');
            } else {
                return sendNotFound(res, 'No product price records available.');
            };

        };
    } catch (error) {
        return sendServerError(res, error);
    };
};

export const fetchProductsPricesController = async (req, res) => {

    try {
        const result = await fetchProductPriceService();

        if (result.recordset) {
            let fetchMessage = '';

            if (result.rowsAffected > 0) {
                fetchMessage = 'All product price records fetched.';
            } else {
                fetchMessage = 'No product price available at the moment.';
            };

            return dataFound(res, result.recordset, fetchMessage);
        };

    } catch (error) {
        return sendServerError(res, error);
    };
};

export const updateProductPriceController = async (req, res) => {

    let permission = false;

    const editor = await fetchUsersService({ userId: req.params.editorId });

    if (editor?.recordset?.length > 0 && editor.recordset[0].userRole === 'Admin' || editor.recordset[0].userRole === 'Employee') {
        permission = true;
    };

    const availableEntry = await fetchProductPriceService(req.params);

    if (availableEntry.recordset.length > 0) {

        if (permission) {
            try {
                const result = await updateProductPriceService(req.params, req.body);

                if (result.rowsAffected > 0) {

                    return dataFound(res, result.recordset, `Product price record updated successfully`);
                } else {
                    return sendBadRequest(res, `Product price details not updated. Please retry.`)
                }

            } catch (error) {
                return sendServerError(res, error);
            };
        } else {
            return unAuthorized(res, 'You are not allowed to edit this record.')
        };

    } else {
        return sendNotFound(res, 'No record to update was found');
    };
};

export const deleteProductPriceController = async (req, res) => {

    let permission = false;

    const editor = await fetchUsersService({ userId: req.params.editorId });

    if (editor?.recordset?.length > 0 && editor.recordset[0].userRole === 'Admin' || editor.recordset[0].userRole === 'Employee') {
        permission = true;
    };

    const availableEntry = await fetchProductPriceService(req.params);

    if (availableEntry.recordset.length > 0) {

        if (permission) {
            try {
                const result = await deleteProductPriceService(req.params);

                if (result.rowsAffected > 0) {

                    return sendDeleteSuccess(res, 'Product price entry deleted successfully');
                } else {
                    return sendServerError(res, 'There was a problem occurred while deleting product price record');
                };

            } catch (error) {
                sendServerError(res, error);
            };
        } else {
            return unAuthorized(res, 'You are not allowed to delete this product price entry.')
        };

    } else {
        return sendNotFound(res, 'No product price record to delete was found');
    };
};