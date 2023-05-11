const {User} = require('./User');
const {sequelize, Sequelize} = require('./db');
const {Quote} = require('./quotes')


module.exports = {
    User,
    Quote,
    sequelize,
    Sequelize
};
