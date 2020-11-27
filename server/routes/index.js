var express = require('express');
var board = require('./board');
 
const router = express.Router();
router.use('/board',board);
 
module.exports =  router;
