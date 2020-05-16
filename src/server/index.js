const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser')
var path = require('path')
var aylien = require("aylien_textapi");
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
// set aylien API credentias
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});


const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
