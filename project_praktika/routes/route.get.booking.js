// routes/route.booking.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/bid.model');

// Получить все бронирования пользователя
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.find({ userId }).populate('carId').populate('userId', 'name'); // использовать populate для получения данных автомобиля
        res.json(bookings);
    } catch (error) {
        console.error('Ошибка при получении бронирований:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;