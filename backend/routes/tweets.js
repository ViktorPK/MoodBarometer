var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
const config = require('../config');
var currentWeekNumber = require('current-week-number');
var db = require('../db');
var pCount=0;
var cCount=0;
var nCount=0;
var pSent=0;
var nSent=0;
var overallSentiment=0;
var count=0;
var averageSentiment=0;
var io;

db.getWeek(currentWeekNumber(), function(err,doc){// Recover values from database in the event of a server crash
 io=require('../bin/www');
  if (doc){
    console.log("backup found!")
    pCount=doc.positive;
    cCount=doc.neutral;
    nCount=doc.negative;
    pSent=doc.pSentiment;
    nSent=doc.nSentiment;
    overallSentiment=doc.averageSentiment*doc.count;
    count=doc.count;
    averageSentiment=doc.averageSentiment;
  }
});

//Get credentials from config file
var client = new Twitter({        //Twitter API connection
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');      //IBM Watson connection
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': config.watson.username,
  'password': config.watson.password,
  'version_date': config.watson.version_date
});

var parameters = config.watson.parameters;

function emitMain(){
  if (pCount==0 && nCount==0) {
    io.emit('tweet',{count: count, positive:pCount, pSent:0, negative:nCount, nSent: 0, neutral:cCount}); //thats ugly.
  }
  else if (nCount==0) {
    io.emit('tweet',{count: count, positive:pCount, pSent:(pSent/pCount), negative:nCount, nSent: 0, neutral:cCount});
  }
  else if (pCount==0) {
    io.emit('tweet',{count: count, positive:pCount, pSent: 0, negative:nCount, nSent:(nSent/nCount), neutral:cCount});
  }
  else {
  io.emit('tweet',{count: count, positive:pCount, pSent:(pSent/pCount), negative:nCount, nSent:(nSent/nCount), neutral:cCount});
}
db.update(currentWeekNumber(),pCount, pSent, nCount, nSent, cCount, count, averageSentiment)  //update db after each tweet
}

function emitTweet(parameters,response){
  io.emit('twit',{text:parameters.text,label:response.sentiment.document.label, score:response.sentiment.document.score});
}


client.stream('statuses/filter', {track: '#mood', language:'en'}, function(stream) {  //stream english tweets featuring #mood
  stream.on('data', function(event) {
    if (event.extended_tweet) parameters.text=event.extended_tweet.full_text;       //if tweet is shortened get full tweet
    else parameters.text = event.text;
    natural_language_understanding.analyze(parameters, function(err, response) {
  if (err)
    console.log('Analyze API error:', err);
  else if (response.sentiment != null) {
    var sentScore=response.sentiment.document.score;
    if(event.retweeted_status) sentScore=sentScore/2;  //weighted scoring for Retweets - retweets are less valuable than original tweets
    overallSentiment+=sentScore;                              //calculate statistics
    if (response.sentiment.document.label=='positive') {
      pCount++;
      pSent+=sentScore;
    }
    else if (response.sentiment.document.label=='negative') {
      nCount++;
      nSent+=sentScore;
    }
    else {
      cCount++;
    }
    //print info to console
    count=nCount+pCount+cCount;
    averageSentiment=overallSentiment/count;
    console.log(response.sentiment.document.score + '  ' +response.sentiment.document.label)
    console.log('Overall: ' + overallSentiment + ' Count: ' + count + ' Average: ' + averageSentiment);
    console.log(parameters.text)
    console.log('---------------------------------------------\n')
    emitMain();
    emitTweet(parameters,response);
  }
});
  });
  stream.on('error', function(error) {  //TODO reconnect on error?
    throw error;
  });
});

function giveCount(req,res) {               //TODO redirect to main page
  emitMain();
  res.json({ count: cCount+nCount+pCount});
}

router.get('/', giveCount);

module.exports = router;
