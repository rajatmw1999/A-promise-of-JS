const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
app.use(express.json());

app.post('/notification', async(req, res) => {
    try{
        let {data} = req.body;
        console.log(data);
        return res.send({statusCode:200, msg:"Data Received"});
    }
    catch(err)
    {
        console.log(err);
        return res.send({statusCode:500, msg:"Some error occured"});
    }
});

app.get('/status', async(req, res) => {
    await axios.get('http://127.0.0.1:5000/polling').then((response) => {
        // console.log(response)
        return res.send(response.data);
    })
    .catch(err => {
        console.log(err);
    });
});

app.listen(3000,function(){
    console.log("Server is running.");
});