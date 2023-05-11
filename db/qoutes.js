const {Sequelize, sequelize} = require('./db');

const Quote = sequelize.define('quotes', {
  name: Sequelize.STRING,
  quote: Sequelize.STRING,
  
});

module.exports = { Quote };