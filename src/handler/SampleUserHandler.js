const uuid = require('uuid');
const httpStatus = require('http-status');

const dbClient = require('../config/DbClient');

module.exports.list = (event, context, callback) => {

    const params = {
        TableName: process.env.DYNAMODB_TABLE_USER
    };

    dbClient.scan(params, (err, results) => {
        if (err) {
            callback(null, {
                statusCode: error.statusCode || httpStatus.NOT_IMPLEMENTED
            });
        }
        callback(null, {
            statusCode: httpStatus.OK,
            body: JSON.stringify(results)
        });
    });
};


module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();

    const params = {
        TableName: process.env.DYNAMODB_TABLE_USER,
        Item: {
            id: uuid.v1(),
            createdAt: timestamp,
            updatedAt: timestamp,
        }
    };

    // write the todo to the database
    return dbClient.put(params, error => {
        if (error) {
            callback(null, {
                statusCode: error.statusCode || httpStatus.NOT_IMPLEMENTED
            });
        }
        callback(null, {
            statusCode: httpStatus.OK,
            body: JSON.stringify(params.Item),
        });
    });

};