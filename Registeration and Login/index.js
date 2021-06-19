const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
app.use(express.json());


//CONNECT TO THE DATABASE
let connection = mysql.createConnection({
    host: 'database-1.c8q9zbgejkeb.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'Admin123',
    database: 'mylist'
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

//CREATE THE USER TABLE
app.get('/createTable', async(req, res) => {
    let createTodos = `create table if not exists todos(
                            id int primary key auto_increment,
                            title varchar(255)not null,
                            completed tinyint(1) not null default 0
                        )`;
    
    connection.query(createTodos, function(err, results, fields) {
        if (err) {
        console.log(err.message);
        }
    });
});

//INSERT INTO DB
app.get('/insert', async(req, res) => {
    let createTodos = `insert into todos values(
                            5,
                            'Get grocery',
                            12
                        )`;
    
    connection.query(createTodos, function(err, results, fields) {
        if (err) {
        console.log(err.message);
        }
    });
});

//GET DATA
app.get('/data', async(req, res) => {
    let createTodos = `select * from todos`;
    
    connection.query(createTodos, function(err, results, fields) {
        if (err) {
        console.log(err.message);
        }
        console.log(results);
    });
});


app.listen(3000,function(){
    console.log("Server is running.");
});