
function successMessage(data) {
    return {
        success: true,
        data: data || null
    };
}

function errorMessage(errorObject, message, code) {
    return {
        success: false,
        message,
        data: errorObject,
        code
    };
}

function invalidMessage(message, code) {
    return {
        success: false,
        message,
        code
    };
}

module.exports = {
    success: successMessage,
    error: errorMessage,
    invalid: invalidMessage
};
