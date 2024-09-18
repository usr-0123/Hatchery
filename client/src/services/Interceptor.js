import { alertService } from "../helpers/alert.js";

const { showAlert } = alertService();

export const interceptor = ({ params, type }) => {

    if (!params) {
        showAlert('Error occured!', 'There was a problem occured. Please retry.', 'error')
        return null;
    };

    if (params.error) {
        if (params.error.data) {
            if (params.error.status === 500) {
                showAlert('Server error occured!', params.error.data.Message, 'error')
                return null;
            };

            if (params.error.status === 401) {
                showAlert('Unauthorised rights!', params.error.data.Message, 'error')
                return null;
            };

            if (params.error.status === 404) {
                showAlert('Entry not found!', params.error.data.Message, 'error')
                // If the user logged in, then log the user out.
                return null;
            };

            if (params.error.status === 409) {
                showAlert('An error occured!', params.error.data.Message, 'error')
                return null;
            };
        };

        if (params.error.error) {
            showAlert('Error occured!', params.error.error, 'error')
            return null;
        };

    } else if (params.data) {
        if (type === 'Mutation') {

            if (params.data.data) {
                showAlert('Execution successful', params.data.Message, 'success')
                return { token: params.data.data };
            } else {
                showAlert('Execution successful', params.data.Message, 'success')
                return true;
            };

        } else if (type === 'Query') {
            if (params.data) {
                return { token: params.data.data };
            };
        };

    } else {
        showAlert('Error occured!', 'There was a problem occured. Please retry.', 'error')
        return null;
    };

};