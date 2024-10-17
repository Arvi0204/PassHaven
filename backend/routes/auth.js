const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')

const JWT_SECRET = 'PassHavenSecureStorage'

// ROUTE 1 = Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('username', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', "Password must be at least 5 characters").isLength({ min: 5 })
], async (req, res) => {
    let success = false;

    // If there are errors, return error and Bad request
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    // Checking if user with same email exists
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry another account exists with this email" });
        }
        // Generating hash and adding salt
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        // console.log(jwtData);
        success = true;
        res.json({ success, authToken })
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 2 = Login for existing User using: POST "/api/auth/login". Login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false;
    // If there are errors, return error and Bad request
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ success, error: "Please login with valid credentials" });

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare)
            return res.status(400).json({ success, error: "Please login with valid credentials" });

        const payload = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }

})

// ROUTE 3 = Get logged in user details using: POST "/api/auth/getuser"
router.post('/getuser', fetchUser, async (req, res) => {
    // Finding user in database using findById, select function to eliminate password and return response
    // If any error in validating auth token, fetchUser function will throw bad request. Any other error, catch block will throw 500 request
    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user);
    } catch (error) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router