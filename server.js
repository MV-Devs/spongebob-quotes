const { sequelize } = require("./db");
const app = require("./index");
//const seed = require("./seed")

const PORT = process.env.PORT || 3000;

const init = async () => {
  try {
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error)
  }
};

init();
//seed();