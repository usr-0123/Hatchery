import { v4 } from "uuid";
import { conflict, dataFound, sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, unAuthorized } from "../helpers/httpStatusCodes.js";
import { fetchUsersService } from "../services/usersServices.js";
import { createNewEggService, deleteEggService, fetchEggsService, updateEggsService } from "../services/eggsService.js";

export const createNewEggController = async (req, res) => {

    try {
        const { userId, batchId, collectionDate, eggsQuantity } = req.body;

        const eggExists = await fetchChicksService();

        const exactEgg = eggExists.recordset.length > 0 && eggExists.recordset.filter(object => object.batchId === batchId && object.userId === userId && object.collectionDate === collectionDate && object.eggsQuantity === eggsQuantity);

        if (exactEgg.length > 0) {
            return conflict(res, 'This egg record already exists.');
        };

        const eggId = v4();

        const egg = {
            eggId,
            userId,
            batchId,
            collectionDate,
            eggsQuantity
        };

        const result = await createNewEggService(egg);

        if (result.message) {
            sendServerError(res, result.message);
        } else {
            if (result.rowsAffected == 1) {
                sendCreated(res, 'Egg registered successfully.');
            };
        };

    } catch (error) {
        return sendServerError(res, `Error: ${error.message}`);
    };
};

export const fetchEggsController = async (req, res) => {

    try {
        const result = await fetchEggsService();

        if (result.recordset) {
            let fetchMessage = '';

            if (result.rowsAffected > 0) {
                fetchMessage = 'All eggs records fetched.';
            } else {
                fetchMessage = 'No egg available at the moment.';
            };

            return dataFound(res, result.recordset, fetchMessage);
        };


    } catch (error) {
        return sendServerError(res, error);
    };
};

export const fetchEggController = async (req, res) => {
    try {
        const result = await fetchEggsService(req.params);

        if (result.recordset) {
            let fetchMessage = '';

            if (result.rowsAffected > 0) {
                fetchMessage = 'Egg record fetched.';
            } else {
                fetchMessage = 'No egg available.';
            };

            return dataFound(res, result.recordset, fetchMessage);
        };

    } catch (error) {
        return sendServerError(res, error);
    };
};

export const updateEggController = async (req, res) => {

    let permission = false;

    const editor = await fetchUsersService({ userId: req.params.editorId });

    if (editor.recordset && editor.recordset.length > 0 && editor.recordset.userRole === 'Admin') {
        permission = true;
    };

    const availableEntry = await fetchEggsService(req.params);

    if (availableEntry.recordset.length > 0) {

        if (permission) {
            try {
                const result = await updateEggsService(req.params, req.body);

                if (result.rowsAffected > 0) {

                    return dataFound(res, result.recordset, `Egg record updated successfully`);
                } else {
                    return sendBadRequest(res, `Egg details not updated!`)
                }

            } catch (error) {
                return sendServerError(res, error);
            };
        } else {
            return unAuthorized(res, 'You are not allowed to edit this record.')
        };

    } else {
        return sendNotFound(res, 'No egg record to update was found');
    };
};

export const deleteEggController = async (req, res) => {

    let permission = false;

    const editor = await fetchUsersService({ userId: req.params.editorId });
    if (editor.recordset && editor.recordset.length > 0 && editor.recordset.userRole === 'Admin') {
        permission = true;
    };

    const availableEntry = await fetchEggsService(req.params);

    if (availableEntry.recordset.length > 0) {

        if (permission) {
            try {
                const result = await deleteEggService(req.params);

                if (result.rowsAffected > 0) {

                    return sendDeleteSuccess(res, 'Egg entry deleted successfully');
                } else {
                    return sendServerError(res, 'There was a problem occurred while deleting egg record');
                };

            } catch (error) {
                sendServerError(res, error);
            };
        } else {
            return unAuthorized(res, 'You are not allowed to delete this egg entry.')
        };

    } else {
        return sendNotFound(res, 'No egg record to delete was found');
    };
};