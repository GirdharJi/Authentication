const { Sequelize } = require("sequelize");

const createDB = new Sequelize("user", "username", "password", {
    dialect: "sqlite",
    host: "./config/db.sqlite"
})

module.exports = createDB;