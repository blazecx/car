const express = require('express');
const mongoose = require('mongoose');
const Car = require('../models/catalog_car.models');
const app = express();
const router = express.Router();

router.get('/getCar', async(req, res) => {
    try{
        const cars = await Car.find();
        res.json(cars);
    }catch{
        res.status(500).json({ message: err.message }); // Обработка ошибок
    }
})

module.exports = router;