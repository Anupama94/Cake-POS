const ErrorConstants = require('./errorConstants')

function successMessage(data, message, code) {
  return {
    success: true,
    data: data || null
  };
}

function errorMessage(errorObject, message, code) {
  return {
    success: false,
    message: message,
    data: errorObject,
    code: code
  };
}

module.exports = {
  success: successMessage,
  error: errorMessage
};