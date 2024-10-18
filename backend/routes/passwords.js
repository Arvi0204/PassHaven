const express = require('express')
const router = express.Router();
const Passwords = require('../models/Passwords');
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator');

// ROUTE 1 = Get all passwords: GET "/api/passwords/fetchallpass". login required
router.get('/fetchallpass', fetchUser, async (req, res) => {
    try {
        const passwords = await Passwords.find({ user: req.user.id })
        res.send(passwords);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})
// ROUTE 2 = Add passwords: POST "/api/notes/addpass". login required
router.post('/addpass', fetchUser, [
], async (req, res) => {
    try {
        const { url, username, password } = req.body;

        const pass = new Passwords({
            url, username, password, user: req.user.id
        })
        const savedPassword = await pass.save();
        res.json(savedPassword);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})
// ROUTE 3 = Update existing passwords: PUT "/api/passwords/updatepass". Login required
router.put('/updatepass/:id', fetchUser, async (req, res) => {
    try {
        const { url, username, password } = req.body;
        // Create new Note object
        const newPass = {};
        if (url) { newPass.url = url };
        if (username) { newPass.username = username };
        if (password) { newPass.password = password };

        // Find note to be updated
        let pass = await Passwords.findById(req.params.id);
        if (!pass)
            return res.status(404).send("Password not found");

        // Verify is user is authenticated and if not invalidate them
        if (pass.user.toString() !== req.user.id)
            return res.status(401).send("Not authorised");

        pass = await Passwords.findByIdAndUpdate(req.params.id, { $set: newPass }, { new: true });
        res.json(pass);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 4 = Delete existing notes: DELETE "/api/notes/deletenote". Login required
router.delete('/deletepass/:id', fetchUser, async (req, res) => {
    try {
        // Find the note to be deleted
        let pass = await Passwords.findById(req.params.id);
        if (!pass) {
            return res.status(404).send("Note not found");
        }

        // Verify if the user is the owner of the note
        if (pass.user.toString() !== req.user.id) {
            return res.status(401).send("Not authorized");
        }

        // Delete the note using the note ID from req.params.id
        pass = await Passwords.findByIdAndDelete(req.params.id);

        res.json({ note: pass, "Success": "Note deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;