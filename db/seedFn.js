const {sequelize} = require('./db');
const {Quote} = require('./quotes.js');
const {User} = require('./User.js');
const {quotes,users} = require('./seedData');

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // recreate db
    const createdUsers = await User.bulkCreate(users);
    const createdQuotes = await Quote.bulkCreate(quotes);
    for (let i=0; i<createdQuotes.length; ++i) {
      const quote = createdQuotes[i];
      const user = createdUsers[i % createdUsers.length].id;
     //await quote.setUser(user);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = seed;