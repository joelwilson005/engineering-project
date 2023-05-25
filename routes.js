var express = require('express');

var router = express.Router();


router.get('/', (req, res) => {
    res.render('index')
})



router.get('/police', (req, res) => {
    res.render('police')
})


router.get('/police-clarendon', (req, res) => {
    res.render('police-clarendon')
})



router.get('/012546', (req, res) => {
    res.render('012546')
})



module.exports = router;