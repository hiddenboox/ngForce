import { LOGIN_USER, LOGOUT_USER, RECEIVE_USER_DATA } from "./constants";

export function userLogin() {
    return {
        type: LOGIN_USER
    };
}

export function updateUserData(user) {
    return {
        type: RECEIVE_USER_DATA,
        payload: user
    };
}

export function logout() {
    return {
        type: LOGOUT_USER
    };
}
