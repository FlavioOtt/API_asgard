const userModel = require("../model/userModel");
const mysql = require("../model/mysqlConnect");

exports.get = async (header) => {
    let res = await mysql.query("SELECT * FROM user");
    return res;
}

exports.register = async (body) => {
    return userModel.register(body);
}

exports.updateSerial = async (body) => {
    return userModel.updateSerial(body);
}

exports.login = async (body) => {
    return userModel.login(body);
}

exports.verifyToken = async (token) => {
    return userModel.verifyJWT(token);
}
