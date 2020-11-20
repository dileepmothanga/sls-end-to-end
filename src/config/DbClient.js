const { DynamoDB } = require('aws-sdk');

let options = {};

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000'
    };
}

module.exports = new DynamoDB.DocumentClient(options);
