'use strict';
const express = require("express");
const {food} = require("../models/indexModel");
const foodRoute = express.Router();
const validator= require('../middleware/validator');

foodRoute.get("/food", getFood);
foodRoute.get("/food/:id",validator, getOneFood);
foodRoute.post("/food", createFood);
foodRoute.put("/food/:id",validator, updateFood);
foodRoute.delete("/food/:id",validator, deleteFood);

async function getFood(req, res) {
    const allFood = await food.findAll();
    res.status(200).json(allFood);
}

async function getOneFood(req, res) {
    const id = parseInt(req.params.id);
    let oneFood = await food.findOne({ where: { id: id } });
    res.status(200).json(oneFood);
}

async function createFood(req, res) {
    let newFood = req.body;
    let foo = await food.create(newFood);
    res.status(201).json(foo);
}

async function updateFood(req, res) {
    let id = parseInt(req.params.id);
    let updateFood = req.body; 
    let foundFood = await food.findOne({ where: { id: id } });
    if (foundFood) {

        let updatedFood = await foundFood.update(updateFood);
        res.status(201).json(updatedFood);
    } else {
        res.status(404);
    }
}
async function deleteFood(req, res) {
    let id = parseInt(req.params.id);
    let deleteFood = await food.destroy({ where: { id: id } });
    res.status(204).json(deleteFood); 
}
module.exports = foodRoute;