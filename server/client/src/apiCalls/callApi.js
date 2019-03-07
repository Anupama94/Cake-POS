import { apiConfig } from '../apiCalls/config';
import { error } from './errorConstants';
import HttpStatus from 'http-status-codes';
import { postCall, authenticatedGetCall, putCall } from './services';


export const userLogin = (credentials) => {
    return new Promise((resolve, reject) => {
        postCall("users/login", credentials)
            .then(result => {
                if (result.status === HttpStatus.OK) {
                    apiConfig.authenticationToken = result.data.token;
                    apiConfig.userId = result.data.id;
                    resolve(result);
                }
            })
            .catch(err => {
                if (err.response.status === HttpStatus.UNAUTHORIZED) {
                    reject({
                        message: error.AUTH_FAILED.MESSAGE,
                        code: error.AUTH_FAILED.CODE
                    });
                }
                else if (err.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
                    reject({
                        message: error.SERVICE_UNAVAILABLE.MESSAGE,
                        code: error.SERVICE_UNAVAILABLE.CODE
                    });
                }
                else {
                    reject({
                        message: error.UNRECOGNIZED_ERROR.MESSAGE,
                        code: error.UNRECOGNIZED_ERROR.CODE
                    });
                }

            });
    });
}


export const getOrderItems = (orderId) => {
    return new Promise((resolve, reject) => {
        authenticatedGetCall("orders/" + orderId)
            .then(result => {
                if (result.status === HttpStatus.OK) {
                    resolve(result);
                }
                else if (result.status === HttpStatus.NOT_FOUND) {
                    resolve(result);
                }
            })
            .catch(err => {
                if (err.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
                    reject({
                        message: error.SERVICE_UNAVAILABLE.MESSAGE,
                        code: error.SERVICE_UNAVAILABLE.CODE
                    });
                }
                else {
                    reject({
                        message: error.UNRECOGNIZED_ERROR.MESSAGE,
                        code: error.UNRECOGNIZED_ERROR.CODE
                    });
                }
            });
    });
}


export const updateOrder = (orderId, updateOps) => {
    return new Promise((resolve, reject) => {
        putCall("orders/" + orderId, updateOps)
            .then(result => {
                if (result.status === HttpStatus.OK) {
                    resolve(result);
                }

            })
            .catch(err => {
                if (err.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
                    reject({
                        message: error.SERVICE_UNAVAILABLE.MESSAGE,
                        code: error.SERVICE_UNAVAILABLE.CODE
                    });
                }
                else {
                    reject({
                        message: error.UNRECOGNIZED_ERROR.MESSAGE,
                        code: error.UNRECOGNIZED_ERROR.CODE
                    });
                }
            });
    });
}


export const getUsersOrders = () => {
    return new Promise((resolve, reject) => {
        console.log(apiConfig.userId);
        authenticatedGetCall("orders/all/" + apiConfig.userId)
            .then(result => {
                if (result.status === HttpStatus.OK) {
                    resolve(result);
                }
                else if (result.status === HttpStatus.NOT_FOUND) {
                    resolve(result);
                }
            })
            .catch(err => {
                if (err.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
                    reject({
                        message: error.SERVICE_UNAVAILABLE.MESSAGE,
                        code: error.SERVICE_UNAVAILABLE.CODE
                    });
                }
                else {
                    reject({
                        message: error.UNRECOGNIZED_ERROR.MESSAGE,
                        code: error.UNRECOGNIZED_ERROR.CODE
                    });
                }
            });
    });
}


export const getMenuItems = () => {
    return new Promise((resolve, reject) => {
        authenticatedGetCall("items/")
            .then(result => {
                if (result.status === HttpStatus.OK) {
                    resolve(result);
                }
                else if (result.status === HttpStatus.NOT_FOUND) {
                    resolve(result);
                }

            })
            .catch(err => {
                if (err.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
                    reject({
                        message: error.SERVICE_UNAVAILABLE.MESSAGE,
                        code: error.SERVICE_UNAVAILABLE.CODE
                    });
                }
                else {
                    reject({
                        message: error.UNRECOGNIZED_ERROR.MESSAGE,
                        code: error.UNRECOGNIZED_ERROR.CODE
                    });
                }
            });
    });
}


