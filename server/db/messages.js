var MongoClient = require('mongodb').MongoClient;

const shortid = require('shortid');

//Create a database named "Mydb";


var url = "mongodb://localhost:27017/gamedb";


MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err;

    const dbo = db.db("gamedb");


    var myObj = [
        {
            _id: shortid.generate(),
            username: 'pastorWilly',
            message: 'all',
            imageUlr: 'http://fb.com',

        },

        {
            _id: shortid.generate(),
            username: 'EnereJunction',
            message: 'i want banga',
            imageUlr: 'http://fb.com',

        },

    ];


    //add user collection to database
    dbo.collection("user").insertMany(myObj, function (err, res) {
        if (err) throw err;

        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });

});


//find from database function
function getAll() {
    dbo.collection("user").findOne({}, function (err, result) {
        if (err) throw err;
        console.log(result.name);
        db.close();
    });

}


module.exports = {
    getAll
};