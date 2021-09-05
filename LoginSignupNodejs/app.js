const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
app.use(express.json());
var crypto = require('crypto');

require('dotenv').config({path: __dirname + '/.env'})

//CONNECT TO THE DATABASE
let connection = mysql.createConnection({
    host: process.env.DB_HOST_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

//CREATE THE USER TABLE
app.get('/createTable', async(req, res) => {
    let createUser = `create table if not exists user(
                            id int primary key auto_increment,
                            email varchar(255) not null,
                            password varchar(255) not null
                        )`;
     
    let createPost = `create table if not exists post(
        id int primary key auto_increment,
        title varchar(50),
        body varchar(255),
        likes int default 0
    )`;
    
    connection.query(createUser, function(err, results, fields) {
        if (err) {
            return err;
        }
        else{
            console.log("Created user table");
        }
    });

    connection.query(createPost, function(err, results, fields) {
        if (err) {
            return err;
        }
        else{
            return res.send(results);
        }
    });
});

app.post('/account/create', async(req, res) => {
    var {id, email, password} = req.body;
    let getUser = `select email from user where email='${email}'`;

    connection.query(getUser, function(err, results, fields) {
        if(results.length == 0)
        {
            console.log("No such user");
        }
        else
        {
            return res.send("User already exists");
        }
        if (err) {
            return res.send(err.message);
        }
    });

    var shasum = crypto.createHash('sha1');
    shasum.update(password);
    var hashed = shasum.digest('hex');

    let createUser = `insert into user values('${id}','${email}','${hashed}')`;
    connection.query(createUser, function(err, results, fields) {
        if (err) {
            console.log(err.message);
        }
        return res.send("User created");
    });
});


app.post('/account/login', async(req, res)=> {
    var {email,password} = req.body;
    let getUser = `select email,password from user where email='${email}'`;
    connection.query(getUser, function(err, results, fields) {
        if(results.length == 0 || results == undefined)
        {
            console.log("No such user");
        }
        else
        {
            var shasum = crypto.createHash('sha1');
            shasum.update(password);
            var hashed = shasum.digest('hex');
            if(hashed == results[0].password)
                return res.send("You are logged in");
            else
                return res.send("Email and password do not match");
        }
        if (err) {
            return res.send(err.message);
        }
    });
});

app.post('/post/create', async(req, res) => {
    var {title, body} = req.body;

    let createPost = `insert into post values(0,'${title}','${body}',0)`;
    connection.query(createPost, function(err, results, fields) {
        if (err) {
            console.log(err.message);
        }
        return res.send("Post created");
    });
});

app.get('/post/all', async(req, res) => {

    let getAllPosts = `select * from post`;
    connection.query(getAllPosts, function(err, results, fields) {
        if (err) {
            console.log(err.message);
        }
        return res.send(results);
    });
});


// app.get('/user/:id', async(req, res)=>{
//     var {id} = req.params;
//     let getUser = `select * from user where id=${id}`;
//     connection.query(getUser, function(err, results, fields) {
//         if(results.length == 0 || results == undefined)
//         {
//             console.log("No user with that id.");
//         }
//         else
//         {
//             console.log(results)
//             res.send("User found!");
//         }
//         if (err) {
//         console.log(err.message);
//         }
//     });

// });

app.listen(3000,function(){
    console.log("Server is running.");
});