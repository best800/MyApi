const http = require("http")
const express = require('express')
const requestify = require('requestify');
const fs = require('fs')
var port = process.env.PORT || 5500;
const cors = require('cors')
const app = express();

app.use(cors())

var headers = {
    "accept-language": "en-US,en;q=0.9",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
   
}

function onRequest(req, res){
   
    res.writeHead(200,{'Content-Type':"text/html"})
    fs.readFile('index.html','utf-8',(error,data)=>{
        if(error){
            res.writeHead(404)
            res.write('Resource not found')
        }
        else{
            res.write(data)
        }
         res.end();   
    })
}
http.createServer((onRequest)).listen(port)



