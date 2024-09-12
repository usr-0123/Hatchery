import { v4 } from "uuid";
import { conflict, dataFound, sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, unAuthorized } from "../helpers/httpStatusCodes.js";
import { fetchUsersService } from "../services/usersServices.js";
import { createNewSaleService, deleteSalesService, fetchSalesService, updateSalesService } from "../services/salesServices.js";

export const createNewSaleController = async (req, res) => {

    try {
        const { batchId, chickId, saleDate, quantitySold, chickPrice } = req.body;

        const saleExists = await fetchSalesService();

        const exactSales = saleExists.recordset.length > 0 && saleExists.recordset.filter(object => object.batchId === batchId && object.chickId === chickId && object.saleDate === saleDate && object.chickPrice === chickPrice);

        if (exactSales.length > 0) {
            return conflict(res, 'This sales record already exists.');
        };

        const saleId = v4();

        const total = quantitySold * chickPrice

        const sale = { saleId, batchId, chickId, saleDate, quantitySold, chickPrice, totalAmount: total };

        const result = await createNewSaleService(sale);

        if (result.message) {
            sendServerError(res, result.message);
        } else {
            if (result.rowsAffected == 1) {
                sendCreated(res, 'Sale record registered successfully.');
            };
        };

    } catch (error) {
        return sendServerError(res, `Error: ${error.message}`);
    };
};

export const fetchSalesController = async (req, res) => {

    try {
        const result = await fetchSalesService();

        if (result.recordset) {
            let fetchMessage = '';

            if (result.rowsAffected > 0) {
                fetchMessage = 'All sales records fetched.';
            } else {
                fetchMessage = 'No sales record available at the moment.';
            };

            return dataFound(res, result.recordset, fetchMessage);
        };


    } catch (error) {
        return sendServerError(res, error);
    };
};

export const fetchSaleController = async (req, res) => {
    try {
        const result = await fetchSalesService(req.params);

        if (result.recordset) {
            let fetchMessage = '';

            if (result.rowsAffected > 0) {
                fetchMessage = 'All sales records fetched.';
            } else {
                fetchMessage = 'No sales record available at the moment.';
            };

            return dataFound(res, result.recordset, fetchMessage);
        };

    } catch (error) {
        return sendServerError(res, error);
    };
};

export const updateSalesController = async (req, res) => {

    let permission = false;

    const editor = await fetchUsersService({ userId: req.params.editorId });

    if (editor?.recordset?.length > 0 && req.params.editorId === editor?.recordset[0].userId) {
        permission = true;
    } else if (editor?.recordset?.length > 0 && editor?.recordset[0].userRole === 'Admin') {
        permission = true;
    };

    const availableEntry = await fetchSalesService(req.params);

    if (availableEntry.recordset.length > 0) {

        if (permission) {
            try {
                let editable = req.body;

                if (req.body?.chickPrice) {
                    const total = req.body.chickPrice * availableEntry.recordset[0].quantitySold;
                    editable = { ...req.body, totalAmount: total };
                };

                if (req.body?.quantitySold) {
                    const total = req.body.quantitySold * availableEntry.recordset[0].chickPrice;
                    editable = { ...req.body, totalAmount: total };
                };

                const result = await updateSalesService(req.params, editable);

                if (result.rowsAffected > 0) {

                    return dataFound(res, result.recordset, `Sale record updated successfully`);
                } else {
                    return sendBadRequest(res, `Sale record details not updated!`)
                }

            } catch (error) {
                return sendServerError(res, error);
            };
        } else {
            return unAuthorized(res, 'You are not allowed to edit this record.')
        };

    } else {
        return sendNotFound(res, 'No sale record to update was found');
    };
};

export const deleteSalesController = async (req, res) => {

    let permission = false;

    const editor = await fetchUsersService({ userId: req.params.editorId });
    
    if (editor?.recordset?.length > 0 && req.params.editorId === editor?.recordset[0].userId) {
        permission = true;
    } else if (editor?.recordset?.length > 0 && editor?.recordset[0].userRole === 'Admin') {
        permission = true;
    };

    const availableEntry = await fetchSalesService(req.params);

    if (availableEntry.recordset.length > 0) {

        if (permission) {
            try {
                const result = await deleteSalesService(req.params);

                if (result.rowsAffected > 0) {

                    return sendDeleteSuccess(res, 'Sale record entry deleted successfully');
                } else {
                    return sendServerError(res, 'There was a problem occurred while deleting sale record');
                };

            } catch (error) {
                sendServerError(res, error);
            };
        } else {
            return unAuthorized(res, 'You are not allowed to delete this sale record.')
        };

    } else {
        return sendNotFound(res, 'No sale record record to delete was found');
    };
};