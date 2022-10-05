const express = require("express");
const { Module } = require("module");
const router = express.Router();

//using .env file
require("dotenv").config();

const ORGANIZATION = process.env.ORGANIZATION

//GET org name
router.get("/organization", (req, res, next) => {
    res.json({ "name": ORGANIZATION});
});

Module.EXPORTS = router;