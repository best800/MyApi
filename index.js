const http = require("http")
const express = require('express')
const requestify = require('requestify');
const axios = require('axios');
const fs = require('fs')
var port = process.env.PORT || 5500;
const cors = require('cors')
const app = express();

app.use(cors())

var headers = {
    "accept-language": "en-US,en;q=0.9",
    "path": "/api/option-chain-indices?symbol=NIFTY",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
}

function onRequest(req, res) {

    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': "text/html" })
        fs.readFile('index.html', 'utf-8', (error, data) => {
            if (error) {
                res.writeHead(404)
                res.write('Resource not found')
            }
            else {
                res.write(data)
            }
            res.end();
            return
        })
    }
    else if (req.url == '/nifty') {
        axios.get('https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY')
            .then((response) => response.data).then(rs => {
                res.writeHead(200, { "Content-Type": "json" })
                res.write(JSON.stringify(rs))
                   res.end();  
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

}
http.createServer((onRequest)).listen(port)



