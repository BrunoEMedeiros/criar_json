const routes = require('express').Router();
const AWS = require('aws-sdk');
const Post = require('./models/Post');

const campos = {
    table: []
};

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: process.env.AWS_DEFAULT_REGION
});

routes.post('/posts', async (req, res) =>
{
        var date = new Date().getDate();

        var email = JSON.stringify(req.body.email);

        campos.table.push(req.body);

        var params = {Bucket: 'uploadqrcode', Key: `${date}-${email}.json`, Body: JSON.stringify(campos.table),
        ContentType: "application/json", ACL: "public-read"};

        await s3.upload(params, async(err, data) => {
            if (err) {
                throw err;
            }
            const post = await Post.create({
                name: JSON.stringify(req.body.name),
                email: JSON.stringify(req.body.email),
                key: data.key, 
                url: data.Location
            });
            return res.json(post);
        });
});

module.exports =  routes;