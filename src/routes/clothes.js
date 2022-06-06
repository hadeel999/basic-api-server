'use strict';
const express = require("express");
const {clothes} = require("../models/indexModel");
const clothesRoute = express.Router();
const validator= require('../middleware/validator');

clothesRoute.get("/clothes", getClothes);
clothesRoute.get("/clothes/:id",validator, getOneClothes);
clothesRoute.post("/clothes", createClothes);
clothesRoute.put("/clothes/:id",validator, updateClothes);
clothesRoute.delete("/clothes/:id",validator, deleteClothes);

async function getClothes(req, res) {
    const allClothes = await clothes.findAll();
    res.status(200).json(allClothes);
}

async function getOneClothes(req, res) {
    const id = parseInt(req.params.id);
    let oneClothes = await clothes.findOne({ where: { id: id } });
    res.status(200).json(oneClothes);
}

async function createClothes(req, res) {
    let newClothes = req.body;
    let cloth = await clothes.create(newClothes);
    res.status(201).json(cloth);
}

async function updateClothes(req, res) {
    let id = parseInt(req.params.id);
    let updateClothes = req.body; 
    let foundClothes = await clothes.findOne({ where: { id: id } });
    if (foundClothes) {

        let updatedClothes = await foundClothes.update(updateClothes);
        res.status(201).json(updatedClothes);
    } else {
        res.status(404);
    }
}
async function deleteClothes(req, res) {
    let id = parseInt(req.params.id);
    let deleteClothes = await clothes.destroy({ where: { id: id } });
    res.status(204).json(deleteClothes); 
}
module.exports = clothesRoute;