const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
const db = require('./database');
const cors = require('cors');
dotenv.config();
app.use(express.urlencoded({ extended: true }))
// Позже в коде
app.use(cors({
    origin: 'http://localhost:5173', // Замените порт на тот, который использует ваш React приложение
    methods: ['GET', 'POST','PUT'], // Укажите допустимые методы
    credentials: true // Если требуется отправлять куки
}));
const authRouter = require('./routes/route.auth');
const carRouter = require('./controllers/add.car');
const carGet = require('./routes/route.getCar');
const carGetId = require('./routes/car.get');
const bookingRouter = require('./routes/route.booking');
const bookingGet = require('./routes/route.get.booking');
const bidRouter = require('./routes/route.get.bid.admin');
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRouter);
app.use('/api/car',carRouter);
app.use('/api/car', carGet);
app.use('/api/car', carGetId);
app.use('/api/booking', bookingRouter);
app.use('/api/booking', bookingGet);
app.use('/api/booking', bidRouter);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));