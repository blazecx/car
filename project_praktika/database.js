const db = require('mongoose');
db.connect('mongodb+srv://kirillr648:kiri0530@cluster0.g4jwqjr.mongodb.net/praktika_project?retryWrites=true&w=majority&appName=Cluster0');

module.exports =db;