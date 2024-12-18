const express = require('express');
const router = express.Router();
const Booking = require('../models/bid.model');
router.get('/admin', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('userId', 'name').populate('carId'); // Получаем все заявки с данными пользователя и автомобиля
        res.json(bookings);
    } catch (error) {
        console.error('Ошибка при получении заявок:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});
router.put('/admin/accept/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: 'Принято' },
            { new: true }
        );
        if (!booking) return res.status(404).json({ message: 'Заявка не найдена' });
        res.json(booking);
    } catch (error) {
        console.error('Ошибка при принятии заявки:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Отклонить заявку
router.put('/admin/reject/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: 'Отклонено' },
            { new: true }
        );
        if (!booking) return res.status(404).json({ message: 'Заявка не найдена' });
        res.json(booking);
    } catch (error) {
        console.error('Ошибка при отклонении заявки:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;