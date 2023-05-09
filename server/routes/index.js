const express = require("express");
const router = express.Router();

// different model routers
router.use('/sauces', require('./sauces'));
router.use('/items', require('./items'));

module.exports = router;
