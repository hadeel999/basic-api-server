'use strict';
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
const clothes=require("./clothes");
const food=require("./food");

let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: true,
                native: true
            }
        } : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

module.exports = {
    db: sequelize,
    clothes: clothes(sequelize, DataTypes),
    food: food(sequelize,DataTypes)
};

