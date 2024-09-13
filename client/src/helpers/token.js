import { jwtDecode } from 'jwt-decode';
import { logout } from './logout';

export const setToken = (param) => {
    return sessionStorage.setItem('Hatchery_system', param);
};

export const getToken = () => {
    return sessionStorage.getItem('Hatchery_system');
};

export const decodeToken = (params) => {
    const token = getToken();

    if (token) {
        return jwtDecode(token);
    };

    if (params) {
        return jwtDecode(params);
    };

    return null;
};

export const clearStorageOnTokenExpiry = () => {

    const token = decodeToken();

    if (token) {
        const currentTime = Date.now() / 1000;

        if (token.exp < currentTime) {

            return logout({ timeout: 'timeout' })
        }
    };

    if (!token) {
        return { route: "/login" };
    };
    
    return;
};