import { alertService } from "./alert.js";

const { showAlert } = alertService();

export const logout = async (params) => {

    sessionStorage.removeItem('Hatchery_system');

    if (params) {
        const {timeout} = params;
        
        if (timeout) {
            showAlert('warning', 'Session time out. Please login again', 'warning', 3)
            window.location.reload();
        };
    };

    return {route: "/login"};

}