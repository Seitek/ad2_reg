'use strict';

const express = require('express');
var app = express();

const path = require('path');
const mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "anmeldung"
});

//app.get('/',(req,res) =>{
//    res.sendFile(path.join(__dirname+'/views/index.html'));
//});

app.use('/', express.static(__dirname + '/views'));

app.post('/submit', (req,res) =>{

    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;

    res.sendFile(path.join(__dirname+'/views/fertig.html'));

    con.connect((err) =>{
        if(err) throw err;
        var sql = "INSERT INTO form (name,email,description) VALUES ('"+name+"','"+email+"','"+username+"')";
        con.query(sql, (err,result) =>{
            if(err) throw err;
            console.log("1 record inserted");
            res.end();
        });
    });

});

app.listen(3000,() =>{
    console.log('Server started on Port 3000...');
})