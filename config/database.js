// const { Client } = require("pg");

// const client = new Client({
//     host: "localhost",
//     port: "5432",
//     user: "postgres",
//     password: "1234",
//     database: "homejam"

// });

// client.connect();

const Sequelize = require('sequelize');
const sequelize = new Sequelize('homejam', 'postgres', '1234', {
    host: "localhost",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize.authenticate()
    .then(() => {
        console.log("Database connected !");
    }).catch(err => {
        console.log("Database connection error : " + err);
    });


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/usersModel')(sequelize, Sequelize.DataTypes);

db.sequelize.sync().then(() => { console.log("Users table created successfully"); }).catch(err => { console.log("Error : " + err); });

module.exports = db;