import { v4 } from "uuid";
import { conflict, dataFound, sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, unAuthorized } from "../helpers/httpStatusCodes.js";
import { fetchUsersService } from "../services/usersServices.js";
import { createNewIncubationService, deleteIncubationService, fetchIncubationsService, updateincubationService } from "../services/incubationService.js";

export const createNewIncubationController = async (req, res) => {

    try {
        const { startDate, totalEggs } = req.body;

        const incubationExists = await fetchIncubationsService();

        const exactIncubation = incubationExists.recordset.length > 0 && incubationExists.recordset.filter(object => object.startDate === startDate && object.totalEggs === totalEggs && object.IncubationState === IncubationState);

        if (exactIncubation.length > 0) {
            return conflict(res, 'This incubation record already exists.');
        };

        const incubationId = v4();

        const startDateObj = new Date(startDate);
        const hatchDateObj = new Date(startDateObj);
        hatchDateObj.setDate(hatchDateObj.getDate() + 21);

        const hatchDate = hatchDateObj.toISOString().split('T')[0];

        const incubation = { incubationId, startDate, hatchDate, totalEggs };

        const result = await createNewIncubationService(incubation);

        if (result.message) {
            sendServerError(res, result.message);
        } else {
            if (result.rowsAffected == 1) {
                sendCreated(res, 'Incubation record registered successfully.');
            };
        };

    } catch (error) {
        return sendServerError(res, `Error: ${error.message}`);
    };
};

export const fetchIncubationsController = async (req, res) => {

    try {
        const result = await fetchIncubationsService();

        if (result.recordset) {
            let fetchMessage = '';

            if (result.rowsAffected > 0) {
                fetchMessage = 'All incubation records fetched.';
            } else {
                fetchMessage = 'No incubation record available at the moment.';
            };

            return dataFound(res, result.recordset, fetchMessage);
        };


    } catch (error) {
        return sendServerError(res, error);
    };
};

export const fetchIncubationController = async (req, res) => {
    try {
        const result = await fetchIncubationsService(req.params);

        if (result.recordset) {
            let fetchMessage = '';

            if (result.rowsAffected > 0) {
                fetchMessage = 'Incubation record record fetched.';
            } else {
                fetchMessage = 'No incubation record available.';
            };

            return dataFound(res, result.recordset, fetchMessage);
        };

    } catch (error) {
        return sendServerError(res, error);
    };
};

export const updateincubationController = async (req, res) => {

    let permission = false;

    if (req?.params?.editorId) {
        const editor = await fetchUsersService({ userId: req.params.editorId });

        if (editor?.recordset?.length > 0 && editor.recordset[0].userRole === 'Admin' || editor.recordset[0].userRole === 'Employee') {
            permission = true;
        };
    }

    const availableEntry = await fetchIncubationsService(req.params);

    if (availableEntry.recordset.length > 0) {

        if (permission) {
            try {
                const result = await updateincubationService(req.params, req.body);

                if (result.rowsAffected > 0) {

                    return dataFound(res, result.recordset, `Incubation record updated successfully`);
                } else {
                    return sendBadRequest(res, `Incubation record details not updated!`)
                }

            } catch (error) {
                return sendServerError(res, error);
            };
        } else {
            return unAuthorized(res, 'You are not allowed to edit this record.')
        };

    } else {
        return sendNotFound(res, 'No incubation record to update was found');
    };
};

export const deleteIncubationController = async (req, res) => {

    let permission = false;

    const editor = await fetchUsersService({ userId: req.params.editorId });

    if (editor?.recordset?.length > 0 && editor.recordset[0].userRole === 'Admin' || editor.recordset[0].userRole === 'Employee') {
        permission = true;
    };

    const availableEntry = await fetchIncubationsService(req.params);

    if (availableEntry.recordset.length > 0) {

        if (permission) {
            try {
                const result = await deleteIncubationService(req.params);

                if (result.rowsAffected > 0) {

                    return sendDeleteSuccess(res, 'Incubation record entry deleted successfully');
                } else {
                    return sendServerError(res, 'There was a problem occurred while deleting Incubation record');
                };

            } catch (error) {
                sendServerError(res, error);
            };
        } else {
            return unAuthorized(res, 'You are not allowed to delete this Incubation record.')
        };

    } else {
        return sendNotFound(res, 'No Incubation record record to delete was found');
    };
};