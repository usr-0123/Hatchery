import { v4 } from "uuid";
import { conflict, dataFound, sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, unAuthorized } from "../helpers/httpStatusCodes.js";
import { fetchUsersService } from "../services/usersServices.js";
import { createNewHatchRecordService, deleteHatchRecordService, fetchHatchRecordsService, updateHatchService } from "../services/hatchRecordsServices.js";

export const createNewHatchRecordController = async (req, res) => {

    try {
        const { batchId, hatchedChicks, unHatchedEggs, dateHatched } = req.body;

        const hatchRecordExists = await fetchHatchRecordsService();

        const exactHatchRecord = hatchRecordExists.recordset.length > 0 && hatchRecordExists.recordset.filter(object => object.batchId === batchId && object.dateHatched === dateHatched);

        if (exactHatchRecord.length > 0) {
            return conflict(res, 'This hatch record already exists.');
        };

        const hatchRecordId = v4();

        const hatchRecord = { hatchRecordId, batchId, hatchedChicks, unHatchedEggs, dateHatched };

        const result = await createNewHatchRecordService(hatchRecord);

        if (result.message) {
            sendServerError(res, result.message);
        } else {
            if (result.rowsAffected == 1) {
                sendCreated(res, 'Hatch record registered successfully.');
            };
        };

    } catch (error) {
        return sendServerError(res, `Error: ${error.message}`);
    };
};

export const fetchHatchRecordsController = async (req, res) => {

    try {
        const result = await fetchHatchRecordsService();

        if (result.recordset) {
            let fetchMessage = '';

            if (result.rowsAffected > 0) {
                fetchMessage = 'All hatch records fetched.';
            } else {
                fetchMessage = 'No hatch record available at the moment.';
            };

            return dataFound(res, result.recordset, fetchMessage);
        };


    } catch (error) {
        return sendServerError(res, error);
    };
};

export const fetchHatchRecordController = async (req, res) => {
    try {
        const result = await fetchHatchRecordsService(req.params);

        if (result.recordset) {
            let fetchMessage = '';

            if (result.rowsAffected > 0) {
                fetchMessage = 'Hatch record record fetched.';
            } else {
                fetchMessage = 'No hatch record available.';
            };

            return dataFound(res, result.recordset, fetchMessage);
        };

    } catch (error) {
        return sendServerError(res, error);
    };
};

export const updateHatchController = async (req, res) => {

    let permission = false;

    const editor = await fetchUsersService({ userId: req.params.editorId });

    if (editor?.recordset?.length > 0 && editor?.recordset[0]?.userRole === 'Admin' || editor?.recordset[0]?.userRole === 'Employee') {
        permission = true;
    };

    const availableEntry = await fetchHatchRecordsService(req.params);

    if (availableEntry.recordset.length > 0) {

        if (permission) {
            try {
                const result = await updateHatchService(req.params, req.body);

                if (result.rowsAffected > 0) {

                    return dataFound(res, result.recordset, `Hatch record updated successfully`);
                } else {
                    return sendBadRequest(res, `Hatch record details not updated!`)
                }

            } catch (error) {
                return sendServerError(res, error);
            };
        } else {
            return unAuthorized(res, 'You are not allowed to edit this record.')
        };

    } else {
        return sendNotFound(res, 'No hatch record to update was found');
    };
};

export const deleteHatchRecordController = async (req, res) => {

    let permission = false;

    const editor = await fetchUsersService({ userId: req.params.editorId });
    
    if (editor?.recordset?.length > 0 && editor.recordset[0].userRole === 'Admin' || editor.recordset[0].userRole === 'Employee') {
        permission = true;
    };

    const availableEntry = await fetchHatchRecordsService(req.params);

    if (availableEntry.recordset.length > 0) {

        if (permission) {
            try {
                const result = await deleteHatchRecordService(req.params);

                if (result.rowsAffected > 0) {

                    return sendDeleteSuccess(res, 'Hatch record entry deleted successfully');
                } else {
                    return sendServerError(res, 'There was a problem occurred while deleting hatch record');
                };

            } catch (error) {
                sendServerError(res, error);
            };
        } else {
            return unAuthorized(res, 'You are not allowed to delete this hatch record.')
        };

    } else {
        return sendNotFound(res, 'No hatch record record to delete was found');
    };
};