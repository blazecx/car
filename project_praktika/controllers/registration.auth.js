const bcrypt = require('bcrypt');
const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
const express = require('express');

exports.register = async (req, res) => {
    const { name,  number_phone, email, password, seria, number } = req.body;
    console.log(req.body); // Вывод пустого объекта

    if (!name || !number_phone || !email || !password || !seria || !number) {
        return res.status(400).json({ message: "Все поля обязательны." });
    }
    const userExists = await User.findOne({ email });
    if(userExists){
        return res.status(400).json({
            message:"Пользователь с таким email уже существует",
        })
    }
    const hashPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        name,
        number_phone,
        email,
        password: hashPassword,
        seria,
        number
    });

    const accessToken = jwt.sign({
        id:user._id,
        name: user.name,
        role: user.role,
    },
    process.env.JWT_SECRET,{
        expiresIn: "1h"
    }
);
    res.status(200).json({
        message: "Пользователь создан",
        user,
        token:accessToken
    });
}

exports.login = async(req,res)=>{
    const {email,password} = req.body;

    console.log(req.body); // Вывод пустого объекта

    const user = await User.findOne({email});

    if(!user|| !(await bcrypt.compare(password, user.password))){//сравниваем подходит ли пароль который ввёл user к данному логину
        return res.status(404).json({
            message: "Неправильный логин или пароль, Попробуйте снова"
        })
    }
    const accessToken = await jwt.sign({id:user._id, name:user.name,role: user.role}, process.env.JWT_SECRET,{
        expiresIn:"1h"
    });

    res.status(200).json({
        message:"Успешно",
        user,
        token:accessToken
    })
}