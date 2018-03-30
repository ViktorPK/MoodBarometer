const config = require('./config');
    var MongoClient = require('mongodb').MongoClient;
    var url = config.db;

     exports.update = function(week,pCount, pSent, nCount, nSent, cCount, cSent, count, averageSentiment, callback)
     {
      MongoClient.connect(url, function(err, db) {
         if(err) throw err;
         const moodBarDB = db.db('moodBar')
         var collection =  moodBarDB.collection('weeks')
         collection.update({week: week},{week: week, positive:pCount, pSentiment:pSent, negative: nCount, nSentiment: nSent, neutral: cCount, count: count, averageSentiment: averageSentiment},{upsert: true}, function(err,docs) {
           if (err) console.log(err);
           db.close();
       });
       });
     };


exports.getWeek = function(week, callback){
  MongoClient.connect(url, function(err, db) {
     if(err) throw err;
     const moodBarDB = db.db('moodBar')
     var collection =  moodBarDB.collection('weeks')

    collection.findOne({week: week}, function(err, doc){
    if(err)
    {
       callback(err);
    }
    else
    {
       callback(null, doc);
    }
  });
});
}
