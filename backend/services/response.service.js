const response = async (res, callback) => {
    try {
        callback();
    } catch (error) {
        errorHandler(error);
    }
}

module.exports = response;