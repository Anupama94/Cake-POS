
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

module.exports = {
    success: successMessage,
    error: errorMessage
};
