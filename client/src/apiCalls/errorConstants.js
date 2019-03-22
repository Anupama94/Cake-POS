
export const error = {
    AUTH_FAILED : {
        MESSAGE: "Invalid Credentials !",
        CODE: 4000
    },

    SERVICE_UNAVAILABLE : {
        MESSAGE: "Service unavailable, try again later",
        CODE: 4001
    },

    UNEXPECTED_ERROR : {
        MESSAGE: "Something happened in setting up the request that triggered an Error",
        CODE: 4002
    },

    CONNECTION_REFUSED : {
        MESSAGE: "Please check whether the server is up!",
        CODE: 4003
    },

    UNRECOGNIZED_ERROR : {
        MESSAGE: "Unrecognized error",
        CODE: 4004
    }
}


export default error;
