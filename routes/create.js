const express = require('express');
const path = require('path');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/auth');

router.get('/', ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/create.html'));
});

module.exports = router;
