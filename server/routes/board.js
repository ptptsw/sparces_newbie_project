var express = require('express');
var Board = require('../models/board');
var mongoose = require('mongoose');
 
const router = express.Router();
 
router.post('/', (req, res) => {
  if (req.body.username === "") {
    return res.status(400).json({
      error: "EMPTY USERNAME",
      code: 2
    });
  }
 
  if (req.body.contents === "") {
    return res.status(400).json({
      error: "EMPTY CONTENTS",
      code: 2
    });
  }
 
  let board = new Board({
    writer: req.body.username,
    contents: req.body.contents
  });
 
  board.save(err => {
    if (err) throw err;
    return res.json({ success: true });
  });
});
 
module.exports = router;