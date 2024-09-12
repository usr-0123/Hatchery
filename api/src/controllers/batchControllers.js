import { v4 } from "uuid";
import { createNewBatchService, deleteBatchService, fetchBatchesService, updateBatchService } from "../services/batchService.js";
import { conflict, dataFound, sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, unAuthorized } from "../helpers/httpStatusCodes.js";
import { fetchUsersService } from "../services/usersServices.js";
import { convertDateToISO, convertToSimpleDate } from "../helpers/helperFunctions.js";

export const createNewBatchController = async (req, res) => {
    try {
        const { userId, receivedDate, totalEggs, batchStatus } = req.body;

        const batchExists = await fetchBatchesService();

        const exactBatch = batchExists.recordset.length > 0 && batchExists.recordset.filter(object => object.userId === userId  && convertToSimpleDate(object.receivedDate) === receivedDate && object.totalEggs === +totalEggs && object.batchStatus === batchStatus );

        if (exactBatch.length > 0) {
            return conflict(res, 'This batch entry already exists.');
        };

        const batchId = v4();

        const batch = {
            batchId,
            userId,
            receivedDate,
            totalEggs,
            batchStatus
        };

        const result = await createNewBatchService(batch);

        if (result.message) {
            sendServerError(res, result.message);
        } else {
            if (result.rowsAffected == 1) {
                sendCreated(res, 'Batch added successfully.');
            };
        };

    } catch (error) {
        return sendServerError(res, `Error: ${error.message}`);
    };
};

export const fetchBatchesController = async (req, res) => {

    try {
        const result = await fetchBatchesService();

        if (result.recordset) {
            let fetchMessage = '';

            if (result.rowsAffected > 0) {
                fetchMessage = 'All batches records fetched.';
            } else {
                fetchMessage = 'No records available at the moment.';
            };

            return dataFound(res, result.recordset, fetchMessage);
        };


    } catch (error) {
        return sendServerError(res, error);
    };
};

export const fetchBatchController = async (req, res) => {
    try {
        const result = await fetchBatchesService(req.params);

        if (result.recordset) {
            let fetchMessage = '';

            if (result.rowsAffected > 0) {
                fetchMessage = 'Batch record fetched.';
            } else {
                fetchMessage = 'No records available.';
            };

            return dataFound(res, result.recordset, fetchMessage);
        };

    } catch (error) {
        return sendServerError(res, error);
    };
};

export const updateBatchController = async (req, res) => {

    let permission = false;

    const editor = await fetchUsersService({ userId: req.params.editorId });

    if (editor?.recordset?.length > 0 && req.params.editorId === editor.recordset[0].userId) {
        permission = true;
    } else if (editor?.recordset?.length > 0 && editor.recordset[0].userRole === 'Admin') {
        permission = true;
    };

    const availableEntry = await fetchBatchesService(req.params);

    if (availableEntry.recordset.length > 0) {

        if (permission) {
            try {
                const result = await updateBatchService(req.params, req.body);

                if (result.rowsAffected > 0) {

                    return dataFound(res, result.recordset, `Batch record updated successfully`);
                } else {
                    return sendBadRequest(res, `Batch details not updated!`)
                }

            } catch (error) {
                return sendServerError(res, error);
            };
        } else {
            return unAuthorized(res, 'You are not allowed to edit this record.')
        };

    } else {
        return sendNotFound(res, 'No batch record to update was found');
    };
};

export const deleteBatchController = async (req, res) => {

    let permission = false;

    const editor = await fetchUsersService({ userId: req.params.editorId });

    if (req.params.editorId === editor.recordset[0].userId) {
        permission = true;
    } else if (editor?.recordset?.length > 0 && editor.recordset[0].userRole === 'Admin') {
        permission = true;
    };

    const availableEntry = await fetchBatchesService(req.params);

    if (availableEntry.recordset.length > 0) {

        if (permission) {
            try {
                const result = await deleteBatchService(req.params);

                if (result.rowsAffected > 0) {

                    return sendDeleteSuccess(res, 'Batch entry deleted successfully');
                } else {
                    return sendServerError(res, 'There was a problem occurred while deleting batch record');
                };

            } catch (error) {
                sendServerError(res, error);
            };
        } else {
            return unAuthorized(res, 'You are not allowed to delete this batch entry.')
        };

    } else {
        return sendNotFound(res, 'No batch record to delete was found');
    };
};