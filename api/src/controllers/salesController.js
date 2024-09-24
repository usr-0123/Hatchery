import { v4 } from "uuid";
import { conflict, dataFound, sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, unAuthorized } from "../helpers/httpStatusCodes.js";
import { fetchUsersService } from "../services/usersServices.js";
import { createNewSaleService, deleteSalesService, fetchSalesService, updateSalesService } from "../services/salesServices.js";
import { newSaleValidator, updateSaleValidator } from "../validators/salesValidators.js";
import { userRoles } from "../../../client/src/helpers/globalStrings.js";

export const createNewSaleController = async (req, res) => {

    try {
        const validation = newSaleValidator(req.body);

        if (validation.error) {
            return sendServerError(res, validation.error.message);
        };

        const { saleDate, quantitySold, price } = req.body;

        const saleExists = await fetchSalesService();

        const exactSales = saleExists.recordset.length > 0 && saleExists.recordset.filter(object => object.saleDate === saleDate && object.price === price);

        if (exactSales.length > 0) {
            return conflict(res, 'This sales record already exists.');
        };

        const saleId = v4();

        const total = quantitySold * price

        const sale = { saleId, saleDate, quantitySold, price, totalAmount: total };

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

    const editor = await fetchUsersService({ userId: req?.params?.editorId });

    if (editor?.recordset?.length > 0 && editor.recordset[0].userRole === 'Admin' || editor.recordset[0].userRole === 'Employee') {
        permission = true;
    };

    const validation = updateSaleValidator(req.body);

    if (validation.error) {
        return sendServerError(res, validation.error.message);
    };

    const availableEntry = await fetchSalesService(req.params);

    if (availableEntry.recordset.length > 0) {

        if (permission) {
            try {
                let editable = req.body;

                if (req.body?.price) {
                    const total = req.body.price * availableEntry.recordset[0].quantitySold;
                    editable = { ...req.body, totalAmount: total };
                };

                if (req.body?.quantitySold) {
                    const total = req.body.quantitySold * availableEntry.recordset[0].price;
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
            return unAuthorized(res, 'You need to be an admin to edit this record.')
        };

    } else {
        return sendNotFound(res, 'No sale record to update was found');
    };
};

export const deleteSalesController = async (req, res) => {

    let permission = false;

    const editor = await fetchUsersService({ userId: req?.params?.editorId });

    if (editor?.recordset?.length > 0 && editor.recordset[0].userRole === 'Admin' || editor.recordset[0].userRole === 'Employee') {
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
            return unAuthorized(res, 'You need to be an admin to edit this record.')
        };

    } else {
        return sendNotFound(res, 'No sale record record to delete was found');
    };
};