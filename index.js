require('dotenv').config();

const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://192.168.0.105:27017/uploads', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(express.json());

app.use(bodyparser.json());

app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

app.listen(3333, function()
{
    console.log("Servidor rodando com express");
});









