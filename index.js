require('dotenv').config();

const express = require('express');
const bodyparser = require('body-parser');
const AWS = require('aws-sdk');
const app = express();
const campos = {
    table: []
};
app.use(express.json());
app.use(bodyparser.json());

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: process.env.AWS_DEFAULT_REGION
});

app.post('/posts', async (req, res) =>
{
        campos.table.push(req.body);
        
        var params = {Bucket: 'uploadqrcode', Key: 'users.json', Body: JSON.stringify(campos.table),
        ContentType: "application/json",
        ACL: "public-read"};

        s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }
            return res.send(`File uploaded successfully. ${data.Location}`);
        });
        /*
        await s3.putObject({
            Bucket: 'uploadqrcode',
            Key: 'users.json',
            Body: JSON.stringify(campos.table),
            ContentType: "application/json",
            ACL: "public-read"
            },
            function (err, data) {
              console.log(data);
            }
          );

          await s3.getSignedUrl('getObject', params, function (err, url) {
            return res.send(url);
          });
          */
})


app.listen(3333, function()
{
    console.log("Servidor rodando com express");
});









