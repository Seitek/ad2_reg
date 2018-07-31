'use strict';

const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const connectionString = "mongodb://admin:secret@192.168.178.95:27017/admin";

MongoClient.connect(connectionString, {autoReconnect: true}, (err, client) =>{
    if(err){
        console.log('Failed to connect...', err.message);
        process.exit(1);
    }

    console.log('connected');

    var db = client.db('admin');

    const users = db.collection('users');

    const user = {
        firstName: 'Steve',
        lastName: 'Jobs'
    };
    
    

    /*users.insertOne(user, err =>{
        if(err){
            console.log('failed to insert user.');
            process.exit(1);
        }
       console.log('Sucessfully inserted user.');
        client.close();
    });*/

    users.find().toArray((err, documents) =>{
        if(err){
            console.log('failed to find users');
            process.exit(1);
        }

        console.log(documents);
    });

    client.close();
});