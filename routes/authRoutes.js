const express = require("express");
const bcrypt = require("bcrypt");
const { validateName, validateEmail, validatePassword } = require("../utils/validators");
const users = require("../models/userModel");

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const doesUserExist = await users.findOne({ where: { email } });

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

        const saveToDB = { name, email, password: ePassword };

        await users.create(saveToDB);

        res.send("User created");

    } catch (error) {
        res.send(error)
    }

})

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const doesUserExist = await users.findOne({ where: { email } });

        console.log(doesUserExist);
        console.log(doesUserExist.password);

        if (!doesUserExist) {
            res.send("User does not exist");
        }

        const matchPassword = await bcrypt.compare(password, doesUserExist.password);

        if (!matchPassword) {
            res.send("Password mismatch");
        }

        res.send("Success");
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;