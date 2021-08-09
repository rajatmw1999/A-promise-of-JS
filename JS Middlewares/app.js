const express = require("express");
const app = express();

const ack = () => {
    return (req, res, next) => {
        console.log("Request Received");
        next();
    }
}

// app.use(ack);

app.get('/github', async(req, res) => {
    res.send("Hello github");
});

app.get('/home', ack(), async(req, res, next) => {
    res.send("This is home");
});

app.listen('3000', ()=>{
    console.log("Listening on port 3000");
});