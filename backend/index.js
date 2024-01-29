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

app.get('/users', async (res, req, next) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (err) {
        next (err);
    }
});

app.get('/users/:id', async (res, req, next) => {
    try {
        const user = await prisma.user.findUnique({
            where : {id : Number(req.params.id) },
        });
        res.status(200).json(user);
    } catch (err) {
        next (err);
    }
});

app.post('/users', async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data : { ...req.body },
        });
        res.status(201).json(user);
    } catch (err) {
        next (err);
    }
});

app.post('/users/:id', async (req, res, next) => {
    try {
        const user = await prisma.user.update({
            where : { id: Number(req.params.id) },
            data : { ...req.body },
        });
        res.status(200).json(user);
    } catch (err) {
        next (err);
    }
});

app.delete('/users/:id', async (req, res, next) => {
    try {
        const user = await prisma.user.delete({
            where : { id: Number(req.params.id) },
        });
        res.status(200).json(user);
    } catch (err) {
        next (err);
    }
});