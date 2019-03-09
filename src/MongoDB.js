var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dbName = "minusmailDB"



//insert item into db
//MongoClient.connect(url, function(err, db) {
//  if (err) throw err;
//  var dbo = db.db("minusmailDB");
//  var myobj = { name: "Company Inc", address: "Highway 37" };
//  dbo.collection("emails").insertOne(myobj, function(err, res) {
//    if (err) throw err;
//    console.log("1 document inserted");
//    db.close();
//  });
//
//});
class MongoDB{
    
     
    static createCollection(collectionName){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            dbo.createCollection(collectionName, function(err, res) {
                if (err) throw err;
                console.log("Collection created!");
                db.close();
            });
        });
    }
    
    static insertEmail(mailObject){
        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log('error connecting') 
                throw err;};
            var dbo = db.db(dbName);
            dbo.collection("emails").insertOne(mailObject, function(err, res) {
            if (err) {
                console.log('error inserting')
                throw err;
            };
            console.log("1 document inserted");
            db.close();
            });
        });
    }
    
    //TODO this function shouldnt need to know about socket... fix teh callback
    static getEmails(userAddress, callback, socket){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            var query = { userAddress: userAddress };
            dbo.collection("emails").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log('retrieved emails for:' + userAddress + ' #: ' + result.length);
            callback(result, socket, userAddress);
            db.close();
            });
        });
    }
    
    
    static dropCollection(collectionName){
        MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.dropCollection(collectionName, function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Collection deleted");
            db.close();
  });
});
        
    }
    

}

export default MongoDB