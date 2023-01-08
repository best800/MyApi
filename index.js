const http = require("http")
const express = require('express')
const requestify = require('requestify');
var port = process.env.PORT || 5500;
const cors = require('cors')
const app = express();

app.use(cors())

var headers = {
    "accept-language": "en-US,en;q=0.9",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
}

app.get('/', (req, res) => {
    requestify.request('https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY', {
        method: 'GET',
        headers: headers,
        dataType: 'json'
    }).then(function (response) {
        res.json(JSON.stringify(response.getBody()));
        res.end();
    }).catch(err => {

    })
})


app.listen(port, () => {
    console.log(port)
})
