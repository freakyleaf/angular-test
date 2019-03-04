const express = require('express');
const path = require('path');
const router = express.Router();

router.use('/', express.static('app', { redirect: false }));

router.get('*', (req, res, next) => {
    res.sendFile(path.resolve('app/index.html'));
});

module.exports = router;
