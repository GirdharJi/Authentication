const express = require("express");
const bcrypt = require("bcrypt");
const { validateName, validateEmail, validatePassword } = require("../utils/validators");

const router = express.Router();

let users = {};

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const doesUserExist = users.hasOwnProperty(email);

        if (doesUserExist) {
            res.send("User already exists");
        }

        if (!validateName(name)) {
            res.send("Incorrect name");
        }

        if (!validateEmail(email)) {
            res.send("Incorrect email");
        }

        if (!validatePassword(password)) {
            res.send("Incorrect password");
        }

        const ePassword = await bcrypt.hash(password, 10);

        users[email] = { name, password: ePassword }

        res.send("User created");

    } catch (error) {
        res.send(error)
    }

})

router.post("/signin", async (req, res) => {
    try {
        const {email, password} = req.body;
        const doesUserExist = users.hasOwnProperty(email);

        if(!doesUserExist){
            res.send("User does not exist");
        }

        const matchPassword = await bcrypt.compare(password, users[email].password);

        if(!matchPassword){
            res.send("Password mismatch");
        }

        res.send("Success");
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;