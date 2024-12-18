const Car = require('../models/catalog_car.models');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
}); 


const upload = multer({ storage });



router.post('/addCars',upload.single('preview'), async (req, res) => {
    console.log('Тело запроса:', req.body);
    console.log('Файл:', req.file);
    const { name, price } = req.body;
    if (!req.file) {
        return res.status(400).json({ message: 'Файл не загружен' });
    }
    console.log('Тело запроса:', req.body);
    console.log('Файл:', req.file);
    const preview = req.file.path;
    try {
        const car =  new Car({
            name,
            price: parseFloat(req.body.price),
            preview,
        })
        await car.save();
        console.log(car);
    }catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

module.exports = router;
