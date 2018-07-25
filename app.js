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
    user: "test",
    password: "",
    database: "testnode",
    port: "8888"
});

//app.get('/',(req,res) =>{
//    res.sendFile(path.join(__dirname+'/views/index.html'));
//});

app.use('/', express.static(__dirname + '/views'));

app.post('/submit', (req,res) =>{

    var password = "test1"; //req.body.password;
    var email = "test2"; //req.body.email;
    var name = "test3"; //req.body.name;

    res.sendFile(path.join(__dirname+'/views/fertig.html'));

    con.connect((err) =>{
        if(err) throw err;
        var sql = "INSERT INTO form (email,password,name) VALUES ('"+email+"','"+password+"','"+name+"')";
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