const express = require('express');
const path = require('path');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    req.session.userId = newUser._id;
    res.redirect('/create');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Inicio de sesión de usuario
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    req.session.userId = user._id;
    res.redirect('/create');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cerrar sesión
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
