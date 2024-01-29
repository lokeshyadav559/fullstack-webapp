const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { raw } = require('@prisma/client/runtime/library');

const app = express();
const prisma = new PrismaClient();

//use json
app.use(express.json());

//cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/test', (res, req, next) => {
    try{
        res.status(200).json({messages : 'Success!'});
    } catch (err) {
        next(err);
    }

});

