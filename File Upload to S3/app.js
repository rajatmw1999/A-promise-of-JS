const express = require("express");
const AWS = require('aws-sdk')
const app = express();

app.get('/presignedurl', async(req, res) => {
    const s3 = new AWS.S3()
    AWS.config.update({region:'us-east-2',accessKeyId: '#', secretAccessKey: '#'});

    const myBucket = '#'
    const myKey = 'image.png'
    const signedUrlExpireSeconds = 60 * 5

    const url = await s3.getSignedUrl('putObject', {
        Bucket: myBucket,
        Key: myKey,
        Expires: signedUrlExpireSeconds
    })

    res.send(url);
});

app.listen('3000', ()=>{
    console.log("Listening on port 3000");
});