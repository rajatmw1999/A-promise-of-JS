const express = require('express');
const app = express();
const axios = require('axios');
app.use(express.json());

const polling_url = 'http://127.0.0.1:5000/polling';

async function middleWare(err, req, res, next){
    console.log(err);
    return res.send({"statusCode":500, "msg":"Some error occured"});
}

app.post('/notification', async(req, res, next) => {
    try{
        let {data} = req.body;
        console.log(data.ehllo);
        return res.send({statusCode:200, msg:"Data Received"});
    }
    catch(err)
    {
        next(err);
    }
});

app.get('/status', async(req, res, next) => {
    await axios.get(polling_url).then((response) => {
        return res.send(response.data);
    })
    .catch(err => {
        console.log(err);
    });
});

app.use(middleWare);

app.listen(3000,function(){
    console.log("Server is running.");
});