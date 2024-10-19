const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const { ObjectId } = require('mongodb');
const connectToDb = require('../server'); // Import connectToDb function

// Helper function to get the passwords collection
const getPasswordsCollection = async () => {
    const db = await connectToDb();
    return db.collection('passwords');
};


// ROUTE 1 = Get all passwords: GET "/api/passwords/fetchallpass". login required
router.get('/fetchallpass', fetchUser, async (req, res) => {
    try {
        const passwordsCollection = await getPasswordsCollection();
        const passwords = await passwordsCollection.find({ user: new ObjectId(req.user.id) }).toArray();
        res.send(passwords);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2 = Add passwords: POST "/api/passwords/addpass". login required
router.post('/addpass', fetchUser, async (req, res) => {
    try {
        const { url, username, password } = req.body;
        const passwordsCollection = await getPasswordsCollection();

        const pass = {
            url,
            username,
            password: password, // Store the encrypted password
            user: new ObjectId(req.user.id)
        };

        const result = await passwordsCollection.insertOne(pass);
        res.json(pass);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3 = Update existing passwords: PUT "/api/passwords/updatepass/:id". login required
router.put('/updatepass/:id', fetchUser, async (req, res) => {
    try {
        const { url, username, password } = req.body;
        const passwordsCollection = await getPasswordsCollection();

        const newPass = {};
        if (url) newPass.url = url;
        if (username) newPass.username = username;

        // Encrypt the new password if it's provided
        if (password) {
            const { iv, encryptedData } = encrypt(password);
            newPass.password = encryptedData; // Store the encrypted password
            newPass.iv = iv; // Store the new initialization vector
        }

        // Find the password to be updated
        const pass = await passwordsCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!pass) {
            return res.status(404).send("Password not found");
        }

        // Check if the user is authorized to update the password
        if (pass.user.toString() !== req.user.id) {
            return res.status(401).send("Not authorized");
        }

        const updatedPass = await passwordsCollection.findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $set: newPass },
            { returnDocument: 'after' }
        );

        res.json(updatedPass);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 4 = Delete existing passwords: DELETE "/api/passwords/deletepass/:id". login required
router.delete('/deletepass/:id', fetchUser, async (req, res) => {
    try {
        const passwordsCollection = await getPasswordsCollection();

        const pass = await passwordsCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!pass) {
            return res.status(404).send("Password entry not found");
        }

        if (pass.user.toString() !== req.user.id) {
            return res.status(401).send("Not authorized");
        }

        await passwordsCollection.deleteOne({ _id: new ObjectId(req.params.id) });

        res.json({ message: "Password deleted successfully", deletedPass: pass });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
