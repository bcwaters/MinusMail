var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dbName = "yakmos"
let testCollection = 'comments'

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
    
    static insertComment(commentObject){
        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log('error connecting') 
                throw err;};
            var dbo = db.db(dbName);
            dbo.collection(testCollection).insertOne(commentObject, function(err, res) {
            if (err) {
                console.log('error inserting')
                throw err;
            };
            console.log("1 document inserted");
            db.close();
            });
        });
    }
    
  
    static getComments(originUrl, callback){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            var query = { originUrl: originUrl };
            dbo.collection(testCollection).find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log('retrieved comments for:' + originUrl + ' #: ' + result.length);
            callback(result);
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

module.exports = MongoDB;