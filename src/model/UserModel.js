const uuid = require('uuid');
const httpStatus = require('http-status');

const dbClient = require('../config/DbClient');

module.exports.list = async () => {

    const params = {
        TableName: process.env.DYNAMODB_TABLE_USER
    };

    try {
        const results = await dbClient.scan(params).promise();
        return {
            statusCode: httpStatus.OK,
            body: JSON.stringify(results.Items)
        };
    }
    catch(err) {
        return {
            statusCode: error.statusCode || httpStatus.NOT_IMPLEMENTED
        };
    }
};


module.exports.create = async () => {

    const timestamp = new Date().getTime();

    const params = {
        TableName: process.env.DYNAMODB_TABLE_USER,
        Item: {
            id: uuid.v1(),
            createdAt: timestamp,
            updatedAt: timestamp,
        }
    };

    try {
        await dbClient.put(params).promise();
        
        return {
            statusCode: httpStatus.OK,
            body: JSON.stringify(params.Item)
        };
    }
    catch(err) {
        return {
            statusCode: error.statusCode || httpStatus.NOT_IMPLEMENTED
        };
    }
};