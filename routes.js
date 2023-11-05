const express = require('express');
const User = require('./user');

const router = express.Router();

router.get('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.login(email, password);

    if (user) {
        res.json({ message: 'Login successful', user });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

router.get('/users', async (req, res) => {
    const users = await User.getAll();
    res.json(users);
});

router.get('/users/:id', async (req, res) => {
    const user = await User.getById(req.params.id);
    res.json(user);
});

router.post('/users', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

router.put('/users/:id', async (req, res) => {
    const user = await User.update(req.params.id, req.body);
    res.json(user);
});

router.delete('/users/:id', async (req, res) => {
    const user = await User.delete(req.params.id);
    res.json(user);
});

module.exports = router;
