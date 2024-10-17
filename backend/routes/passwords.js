const express = require('express')
const router = express.Router();
const Passwords = require('../models/Passwords');
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator');

// ROUTE 1 = Get all passwords: GET "/api/passwords/fetchallpass". login required
router.get('/fetchallpass', fetchUser, async (req, res) => {
    try {
        const notes = await Passwords.find({ user: req.user.id })
        res.send(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router;