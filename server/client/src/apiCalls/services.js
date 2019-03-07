import { apiConfig } from '../apiCalls/config';
import axios from 'axios';
import { error } from './errorConstants';
import HttpStatus from 'http-status-codes';

const baseUrl = "http://localhost:3001/";

export const postCall = (url, mydata) => {
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


export const authenticatedGetCall = (url) => {
    const requestHeader = { headers: { "Authorization": "Bearer " + apiConfig.authenticationToken } };

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


export const putCall = (url, updateOps) => {
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