import { v4 } from "uuid";
import { conflict, dataFound, sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, unAuthorized } from "../helpers/httpStatusCodes.js";
import { fetchUsersService } from "../services/usersServices.js";
import { createNewChickService, deleteChicksService, fetchChicksService, updateChicksService } from "../services/chicksServices.js";

export const createNewChickController = async (req, res) => {
    try {
        const { batchId, hatchRecordId, chickType, quantity, healthStatus } = req.body;

        const chickExists = await fetchChicksService();

        const exactChick = chickExists.recordset.length > 0 && chickExists.recordset.filter(object => object.batchId === batchId && object.hatchRecordId === hatchRecordId && object.chickType === chickType && object.healthStatus === healthStatus);

        if (exactChick.length > 0) {
            return conflict(res, 'This chick already exists.');
        };

        const chickId = v4();

        const chick = {
            chickId,
            batchId,
            hatchRecordId,
            chickType,
            quantity,
            healthStatus
        };

        const result = await createNewChickService(chick);

        if (result.message) {
            sendServerError(res, result.message);
        } else {
            if (result.rowsAffected == 1) {
                sendCreated(res, 'Chick registered successfully.');
            };
        };

    } catch (error) {
        return sendServerError(res, `Error: ${error.message}`);
    };
};

export const fetchChicksController = async (req, res) => {

    try {
        const result = await fetchChicksService();

        if (result.recordset) {
            let fetchMessage = '';

            if (result.rowsAffected > 0) {
                fetchMessage = 'All chicks records fetched.';
            } else {
                fetchMessage = 'No chick available at the moment.';
            };

            return dataFound(res, result.recordset, fetchMessage);
        };


    } catch (error) {
        return sendServerError(res, error);
    };
};

export const fetchChickController = async (req, res) => {
    try {
        const result = await fetchChicksService(req.params);

        if (result.recordset) {
            let fetchMessage = '';

            if (result.rowsAffected > 0) {
                fetchMessage = 'Chick record fetched.';
            } else {
                fetchMessage = 'No chick available.';
            };

            return dataFound(res, result.recordset, fetchMessage);
        };

    } catch (error) {
        return sendServerError(res, error);
    };
};

export const updateChicksController = async (req, res) => {

    let permission = false;

    const editor = await fetchUsersService({ userId: req.params.editorId });

    if (editor?.recordset?.length > 0 && req.params.editorId === editor?.recordset[0].userId) {
        permission = true;
    } else if (editor?.recordset?.length > 0 && editor?.recordset[0].userRole === 'Admin') {
        permission = true;
    };

    const availableEntry = await fetchChicksService(req.params);

    if (availableEntry.recordset.length > 0) {

        if (permission) {
            try {
                const result = await updateChicksService(req.params, req.body);

                if (result.rowsAffected > 0) {

                    return dataFound(res, result.recordset, `Chick record updated successfully`);
                } else {
                    return sendBadRequest(res, `Chick details not updated!`)
                }

            } catch (error) {
                return sendServerError(res, error);
            };
        } else {
            return unAuthorized(res, 'You are not allowed to edit this record.')
        };

    } else {
        return sendNotFound(res, 'No Chick record to update was found');
    };
};

export const deleteChickController = async (req, res) => {

    let permission = false;

    const editor = await fetchUsersService({ userId: req.params.editorId });
    
    if (editor?.recordset?.length > 0 && req.params.editorId === editor?.recordset[0].userId) {
        permission = true;
    } else if (editor?.recordset?.length > 0 && editor?.recordset[0].userRole === 'Admin') {
        permission = true;
    };

    const availableEntry = await fetchChicksService(req.params);

    if (availableEntry.recordset.length > 0) {

        if (permission) {
            try {
                const result = await deleteChicksService(req.params);

                if (result.rowsAffected > 0) {

                    return sendDeleteSuccess(res, 'Chick entry deleted successfully');
                } else {
                    return sendServerError(res, 'There was a problem occurred while deleting Chick record');
                };

            } catch (error) {
                sendServerError(res, error);
            };
        } else {
            return unAuthorized(res, 'You are not allowed to delete this Chick entry.')
        };

    } else {
        return sendNotFound(res, 'No Chick record to delete was found');
    };
};