const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { raw } = require('@prisma/client/runtime/library');

const app = express();
const prisma = new PrismaClient();

// Use express.json() to parse JSON bodies into JS objects
app.use(express.json());

// Enable CORS for all origins, allowing the API to be accessed by any domain
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Test endpoint to check if the server is running properly
app.get('/test', (req, res, next) => {
    try{
        res.status(200).json({messages : 'Success!'});
    } catch (err) {
        next(err);
    }
});

// Get a list of users from the database
app.get('/users', async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (err) {
        next (err);
    }
});

// Get a single user by ID
app.get('/users/:id', async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where : {id : Number(req.params.id) },
        });
        res.status(200).json(user);
    } catch (err) {
        next (err);
    }
});

// Create a new user with data sent in the request body
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

// Update a user by ID with data sent in the request body
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

// Delete a user by ID
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

//Put a user by ID
app.put('/users/:id', async (req, res, next) => {
    try {
        const user = await prisma.user.update({
            where: { id: Number(req.params.id) },
            data: { ...req.body },
        });
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});


// Set the application to listen on a specified port, indicating the server is running
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));