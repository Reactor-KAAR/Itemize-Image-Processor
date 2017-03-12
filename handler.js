'use strict';

const Jimp = require('jimp');
const fetch = require('node-fetch');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const IMGBUCKET = process.env.IMGBUCKET;
const JIMPBUCKET = process.env.JIMPBUCKET;

module.exports.createAndSaveJimp = (event, context, callback) => {
    console.log(event);
    const imageURL = event.image_url || JSON.parse(event.body).image_url;
    const key = event.key || JSON.parse(event.body).key;
    // Download the image from s3 into a buffer
    s3.getObject({
        Bucket: IMGBUCKET,
        Key: key
    }, (err, data) => {
        if(err){
            console.log(err, err.stack);
        }
        console.log(data);
        // Convert image to JIMP
        Jimp.read(data, function(err, image){
            if(err){
                console.log(err);
            }
            // Put JIMP in s3 
            s3.putObject({
                Bucket: JIMPBUCKET,
                Key: "images/" + _sizesArray[
                        index].destinationPath +
                    "/" + fileName.slice(0, -4) +
                    ".jpg",
                Body: data,
                ContentType: 'JPG'
            }, (err, data) => {
                if(err){
                    console.log(err, err.stack);
                }
                // TODO: Put JIMP info in Firebase database
                console.log(data);

            });
        });
    });
};

module.exports.test = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: "running",
            input: {}
        })
    }
    callback(null, response);
}
