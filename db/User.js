const {Sequelize, sequelize} = require('./db');

const User = sequelize.define('users', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  isAdmin:Sequelize.BOOLEAN,
});

module.exports = { User };