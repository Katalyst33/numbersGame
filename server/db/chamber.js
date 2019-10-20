var MongoClient = require('mongodb').MongoClient;

const shortid = require('shortid');

//Create a database named "Mydb";


var url = "mongodb://localhost:27017/yomama";

MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err;

    var dbo = db.db("nogame");

    var myObj2 = [
        { name: 'John', address: 'Highway 71', height:'34'},
        { name: 'Peter', address: 'Lowstreet 4'},
        { name: 'Amy', address: 'Apple st 652'},
        { name: 'Hannah', address: 'Mountain 21'},
        { name: 'Michael', address: 'Valley 345'},
        { name: 'Sandy', address: 'Ocean blvd 2', food:"eba"},
        { name: 'Betty', address: 'Green Grass 1'},
        { name: 'Richard', address: 'Sky st 331'},
        { name: 'Susan', address: 'One way 98'},
        { name: 'Vicky', address: 'Yellow Garden 2'},
        { name: 'Ben', address: 'Park Lane 38'},
        { name: 'William', address: 'Central st 954'},
        { name: 'Chuck', address: 'Main Road 989'},
        { name: 'Viola', address: 'Sideway 1633'}
    ];

    var myObj = [
        {  _id: shortid.generate(), name: 'Chocolate Heaven', sex:'F'},
        {  _id: shortid.generate(), name:'Tasty Lemon', sex:'F'},
        {  _id: shortid.generate(), name: 'Vanilla Dream' , sex:'F'}
    ];




    //add product collection
    dbo.collection("products").insertMany(myObj, function (err, res) {
        if (err) throw err;

        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });

    //add customer collection
     dbo.collection("customer").insertMany(myObj2, function (err, res) {
        if (err) throw err;

        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });

   //find one in database
 /*   dbo.collection("customer").findOne({}, function (err, result) {
        if (err) throw err;

        console.log(result.name);
        db.close();
    });

  */
});

