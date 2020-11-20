

const httpStatus = require('http-status');

module.exports.list = async event => {
    return {
        statusCode: httpStatus.OK,
        body: JSON.stringify(
            {
                message: 'Sample List!!',
                input: event
            }
        )
    };
};

