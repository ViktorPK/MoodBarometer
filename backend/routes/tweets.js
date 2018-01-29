var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var pCount=0;
var cCount=0;
var nCount=0;                     //mby get it from database to recover after server downtime?
var overallSentiment=0;
var client = new Twitter({
  consumer_key: 'mEaGMQ2EfIfRvf2uYm5AgKcHP',
  consumer_secret: 'H59VKkwGsdxpLevayJgQYbzHufC2REvwtvovQn74WpPLpZVGcS',
  access_token_key: '930139087645958144-UyJUTUIxksGXfY2vfskntM5wgUTcbZW',
  access_token_secret: 'pnOFUExNAB0T4ggzzTcmOaYPBukbbJ5WkdOxT9ufj15Uz'
});

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': '41f07a8b-5576-4ce3-a378-ef23aa55dcb2',
  'password': '0vBD65lqdJQM',
  'version_date': '2017-02-27'
});

var parameters = {
  'text': '',
  'features': {
    'sentiment':{}
  }
}

client.stream('statuses/filter', {track: '#mood', language:'en'}, function(stream) {  //stream english tweets featuring #mood
  stream.on('data', function(event) {
    if (event.extended_tweet) parameters.text=event.extended_tweet.full_text;
    else parameters.text = event.text;
    natural_language_understanding.analyze(parameters, function(err, response) {
  if (err)
    console.log('error:', err);
  else
    if(event.retweeted_status) overallSentiment+=response.sentiment.document.score/2  //weighted scoring for Retweets - retweets are less valuable than original tweets
    overallSentiment+=response.sentiment.document.score;                              //calculate statistics
    if (response.sentiment.document.label=='positive') pCount++;
    else if (response.sentiment.document.label=='negative') nCount++;
    else cCount++;
    //print info to console
    console.log(response.sentiment.document.score + '  ' +response.sentiment.document.label)
    console.log('Overall: ' + overallSentiment + ' Count: ' + (nCount+pCount+cCount) + ' Average: ' + overallSentiment/(nCount+pCount+cCount));
    console.log(parameters.text)
    console.log('---------------------------------------------\n')

});
  });
  stream.on('error', function(error) {
    throw error;
  });
});

function giveCount(req,res) {                   //Redirect to Front-End when Sockets are implemented
  res.json({ count: cCount+nCount+pCount});
}

router.get('/', giveCount);

module.exports = router;
