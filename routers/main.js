const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.redirect('/piano')
})

router.get('/autopiano', (req, res, next) => {
    res.render('autopiano');
})

module.exports = router;
