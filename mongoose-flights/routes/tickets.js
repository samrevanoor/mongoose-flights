var express = require('express');
var router = express.Router();
var ticketsCtrl = require('../controllers/tickets')

router.get('/flights/:id/tickets', ticketsCtrl.new);

module.exports = router;