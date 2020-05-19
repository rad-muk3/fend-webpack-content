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
    res.send(mockAPIResponse);
})

// Setup empty JS object to act as endpoint for all routes
projectData = {};

app.post('/sentiment', sendData);


function sendData (req, res) {
    console.log(req);
    const url = req.body.url
    console.log(url);
	//aylienApi
    textapi.sentiment({
        url: url,
        mode: 'document'
    },
    function(error, response) {
        if (error) {
            console.log(error)
        } else {
            res.send(response)
        }
    }
    )
}

app.post("/add", (req, res) => {
    console.log(req.body);
  
    projectData.text = req.body.text;
    projectData.subjectivity = req.body.subjectivity;
    projectData.polarity = req.body.polarity;
    projectData.polarity_confidence = (req.body.polarity_confidence*100);
  
    res.send(projectData);
    console.log(projectData);
  });

  app.get("/all", (req, res) => {
    res.send(projectData);
    console.log(projectData);
  });