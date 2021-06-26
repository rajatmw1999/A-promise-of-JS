const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { response } = require('express');
const app = express();
app.use(express.json());
var crypto = require('crypto');

//CONNECT TO THE DATABASE
let connection = mysql.createConnection({
    host: 'testdatabase.c8q9zbgejkeb.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'admin123',
    database: 'camp'
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

//CREATE THE USER TABLE
app.get('/createTable', async(req, res) => {
    let createTodos = `create table if not exists user(
                            id int primary key auto_increment,
                            email varchar(255) not null,
                            password varchar(255) not null
                        )`;
    
    connection.query(createTodos, function(err, results, fields) {
        if (err) {
        console.log(err.message);
        }
    });
});

app.post('/account/user', async(req, res) => {
    var {id,email, password} = req.body;
    let getUser = `select email from user where email='${email}'`;

    connection.query(getUser, function(err, results, fields) {
        if(results.length == 0)
        {
            console.log("No such user");
        }
        else
        {
            console.log("User already exists with this email");
            res.send("User already exists");
        }
        if (err) {
        console.log(err.message);
        }
    });

    var crypto = require('crypto');
    var shasum = crypto.createHash('sha1');
    shasum.update(password);
    var hashed = shasum.digest('hex');

    let createUser = `insert into user values('${id}','${email}','${hashed}')`;
    connection.query(createUser, function(err, results, fields) {
        console.log(results);
        
        if (err) {
        console.log(err.message);
        }
    });
});

app.listen(3000,function(){
    console.log("Server is running.");
});