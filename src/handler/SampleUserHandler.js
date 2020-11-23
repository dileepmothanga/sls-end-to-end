const UserModel = require('../model/UserModel');

module.exports.list = async () => {
    const results = await UserModel.list();
    return results;
};



module.exports.create = async () => {
    const results = await UserModel.create();
    return results;
};