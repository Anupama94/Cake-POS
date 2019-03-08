import { apiConfig } from '../apiCalls/config';
import axios from 'axios';
import { error } from './errorConstants';
import HttpStatus from 'http-status-codes';

const baseUrl = "http://localhost:3001/";

export const userLogin = (credentials) => {
    return new Promise((resolve, reject) => {
        postCall("users/login", credentials)
            .then(result => {
                if (result.status === HttpStatus.OK) {
                    apiConfig.authenticationToken = result.data.token;
                    apiConfig.userId = result.data.id;
                    resolve();
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


// this needs to be changed
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


/*
    POST, GET, PUT calls defined
 */

function postCall(url, mydata) {
    return new Promise((resolve, reject) => {
        let callingUrl = baseUrl + url;
        axios.post(callingUrl, mydata)
            .then(response => {
                    if (response.status === HttpStatus.OK || response.status === HttpStatus.CREATED) {
                        resolve(response);
                    }
                }
            )
            .catch(err => {
                if (err.response.status === HttpStatus.UNAUTHORIZED) {
                    console.log("Unauthorized request initiated from axios post call in callApi.js");
                    reject(err);
                }
                else if (err.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
                    console.log("Internal Server Error initiated from axios post call in callApi.js");
                    reject(err);
                }
                else {
                    console.log(error.UNEXPECTED_ERROR.MESSAGE + " initiated from  axios post call in callApi.js");
                    reject(err);
                }
            });
    });
}


function authenticatedGetCall(url) {
    let requestHeader = { headers: { "Authorization": "Bearer " + apiConfig.authenticationToken } };

    return new Promise((resolve, reject) => {
        let callingUrl = baseUrl + url;
        axios.get(callingUrl, requestHeader)
            .then(response => {
                if (response.status === HttpStatus.OK || response.response.status === HttpStatus.NOT_FOUND) {
                    resolve(response);
                }
            })
            .catch(err => {
                if (err.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
                    console.log("Internal Server Error initiated from axios authenticatedGetCall in callApi.js")
                    reject(err);
                }
                else {
                    console.log(error.UNEXPECTED_ERROR.MESSAGE + " initiated from  axios authenticatedGetCall in callApi.js");
                    reject(err);
                }
            });

    });
}


function putCall(url, updateOps) {
    let requestHeader = { headers: { "Authorization": "Bearer " + apiConfig.authenticationToken } };
    return new Promise((resolve, reject) => {
        let callingUrl = baseUrl + url;
        axios.put(callingUrl, updateOps)
            .then(response => {
                if (response.status === HttpStatus.OK || response.status === HttpStatus.NO_CONTENT || response.status === HttpStatus.CREATED) {
                    resolve(response);
                }
            })
            .catch(err => {
                if (err.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
                    console.log("Internal Server Error initiated from axios putCall in callApi.js")
                    reject(err);
                }
                else {
                    console.log(error.UNEXPECTED_ERROR.MESSAGE + " initiated from axios putCall in callApi.js");
                    reject(err);
                }
            });
    });
}