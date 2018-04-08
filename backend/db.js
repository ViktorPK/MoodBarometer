const config = require('./config');
    var MongoClient = require('mongodb').MongoClient;
    var url = config.db;

     exports.update = function(week,pCount, pSent, nCount, nSent, cCount, count, averageSentiment, callback)
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
         db.close();
    }
    else
    {
       callback(null, doc);
         db.close();
    }
  });
});
}

exports.getAll = function(){
  var ret = [];
  MongoClient.connect(url, function(err, db) {
     if(err) throw err;
     const moodBarDB = db.db('moodBar')
     var collection =  moodBarDB.collection('weeks')

     collection.find({}).project({_id:0, positive:0, pSentiment:0, negative: 0, nSentiment: 0, neutral: 0}).toArray(function(err, result) {
       if (err) {
           console.log(err);
             db.close();
       } else if (result.length > 0) {
         for (i=result.length-1;i>=0;i--){
           ret.push(Object.values(result[i]));
             db.close();
         }
       }
   });
});

return ret;
}

exports.populate = function()
{
 MongoClient.connect(url, function(err, db) {
    if(err) throw err;
    const moodBarDB = db.db('moodBar')
    var collection =  moodBarDB.collection('weeks')
    for (i=0;i<52;i++){
      var rand=Math.random(-1,1);
      if (i%3==0) rand=rand*(-1);
      collection.update({week: i},{week: i, positive:i*10, pSentiment:rand, negative: i*10, nSentiment: rand, neutral: i*10, count: i*10, averageSentiment: rand},{upsert: true}, function(err,docs) {
        if (err) console.log(err);
    });
    }
  db.close();
  });
};
