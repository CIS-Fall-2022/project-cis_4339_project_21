const express = require("express");
const router = express.Router();

//allow using a .env file
require("dotenv").config();  

const ORGANIZATION = process.env.ORGANIZATION ;

//GET organization name
router.get("/organization", (req, res, next) => { 
    res.json({ "name": ORGANIZATION });
});

module.exports = router;

// to worjk
