require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const { User, Quote } = require('./db');
const {JWT_SECRET_user,JWT_SECRET_admin} = process.env;
const router = express.Router();
app.use("/", router)
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { QueryInterface } = require('sequelize');

router.use(morgan('dev'));
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({extended:true}));

app.get('/', async (req, res, next) => {
    try {
      const quotes = await Quote.findAll();
      res.send(quotes);
            // res.send(`
      //   <h1>Welcome to Spongebob Land!</h1>
      // `);
    } catch (error) {
      console.error(error);
      next(error)
    }
});


// Middleware function to authenticate user using JWT
const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.sendStatus(401);
    }
    const token = authHeader.split(' ')[1];
    try {
      const user = jwt.verify(token, JWT_SECRET_user);
      req.user = user;
      next();
    } catch (error) {
      return res.sendStatus(401);
    }
  };
  
  // Middleware function to authenticate admin user using JWT
  const authenticateAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.sendStatus(401);
    }
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET_admin);
      const user = await User.findOne({ where: { id: decodedToken.userId, isAdmin: true } });
      if (!user) {
        return res.sendStatus(401);
      }
      req.user = user;
      next();
    } catch (error) {
      return res.sendStatus(401);
    }
  };
  
  // Route handler to register a new user and new admin
  router.post('/register', async (req, res) => {
    try {
      const { username, password, isAdmin } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashedPassword, isAdmin });
      const token = jwt.sign({ userId: user.id }, isAdmin ? JWT_SECRET_admin : JWT_SECRET_user);
      return res.status(201).json({ message:"User Successfully Registred",token });
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  });
  
  // Route handler to login a new user and new admin
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.sendStatus(401);
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.sendStatus(401);
      }
      const token = jwt.sign({ userId: user.id }, user.isAdmin ? JWT_SECRET_admin : JWT_SECRET_user);
      return res.json({ message:"User Successfully login",token });
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  });

  // Route handler to retrieve entries for authenticated user
  router.get('/quotes', authenticateUser, async (req, res) => {
    try {
      const userId = req.user.id;
      const quotes = await Quote.findAll({ where: { userId }});
      res.status(200).json(quotes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  });
  
  
  // Route handler to retrieve all entries for admin user
  router.get('/quotes/all', async (req, res) => {
    try {
      const quotes = await Quote.findAll();
      res.json(quotes);
      console.log(JWT_SECRET_admin)
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to retrieve quotes' });
    }
  });

  // Route handler to create an entry for authenticated user and 
router.post('/quotes', authenticateUser, async (req, res) => {
    try {
      const { name, quote } = req.body;
      const userId = req.user.id;
      const NEWquote = await Quote.create({ name, quote, userId });
      res.status(201).json(NEWquote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  });
  
  // Route handler to edit an entry for authenticated user
  router.put('/quotes/:id', authenticateUser, async (req, res) => {
    try {
      const entryId = req.params.id;
      const userId = req.user.id;

      const quote = await Quote.findOne({ where: { id: entryId }, include: User });
      if (!quote || quote.User.id !== userId) {
        return res.status(404).json({ message: 'Entry not found.' });
      }
      await quote.update(req.body);
      res.status(200).json(quote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  });
  
  // Route handler to delete an entry for authenticated user
  router.delete('/quotes/:id', authenticateUser, async (req, res) => {
    try {
      const entryId = req.params.id;
      const userId = req.user.id;
      const quote = await Quote.findOne({ where: { id: entryId }, include: User });
      if (!quote || quote.User.id !== userId) {
        return res.status(404).json({ message: 'Entry not found.' });
      }
      await quote.destroy();
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  });
  
  // Route handler to update user information for admin user
router.put('/users/:id', authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      user.username = username || user.username;
      
      user.password = password ? bcrypt.hashSync(password, 10) : user.password;
      await user.save();
      res.status(200).send({ message: 'User information updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });
  
  // Route handler to delete entry for admin user
  router.delete('/users/:id', authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    try {
      const entry = await User.findOne({ where: { id } });
      if (!entry) {
        return res.status(404).send({ message: 'Entry not found' });
      }
      await entry.destroy();
      res.status(200).send({ message: 'Entry deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });




module.exports = app;