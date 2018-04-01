var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
const config = require('../config');
var currentWeekNumber = require('current-week-number');
var db = require('../db');


var weeks=db.getAll();

function giveStats(req,res) {
  if (weeks.length<3) {
    res.json({error:'Not Enough Data'});
    return;
  }
  var last=weeks[1];
  var first=weeks[weeks.length-1];
  var fd=first[1]
  var ld=last[1];
  var domain=[fd,ld];
  res.json({
    weeks: weeks,
    last: domain
  });
}


router.get('/statistics', giveStats);

module.exports = router;
