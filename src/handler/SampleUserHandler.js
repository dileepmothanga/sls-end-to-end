const uuid = require('uuid');
const httpStatus = require('http-status');

// const dynamoDb = new AWS.DynamoDB.DocumentClient();
const dbClient = require('../config/DbClient');

module.exports.list = async () => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE_USER
    };
    try {
        const results = await dbClient.scan(params);
        console.log(results.Items);
        const response = {
            statusCode: 200,
            body: JSON.stringify(results.Items)
        };
        return response;
    } catch (error) {
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


    // write the todo to the database
    return dbClient.put(params, error => {
        // handle potential errors
        if (error) {
            console.error(error);
            return {
                statusCode: error.statusCode,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t create the todo item.',
            };
        }
        console.log('ss',params.Item);
        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
        return response;
    });
    // try {
    //     const results = await dbClient.put(params);
    //     console.log(results)
    //     const response = {
    //         statusCode: 200,
    //         body: JSON.stringify(results.Items),
    //     };
    //     return response;
    // } catch (error) {
    //     return {
    //         statusCode: error.statusCode || httpStatus.NOT_IMPLEMENTED
    //     };
    // }
};