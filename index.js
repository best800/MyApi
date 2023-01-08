const http = require("http")
const requestify = require('requestify');
var port = process.env.PORT || 5500;
const cors = require('cors')
const app = express();
const router = express.Router();


app.use(cors())

var headers = {
    "accept-language": "en-US,en;q=0.9",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
}

http.createServer((req, res) => {

    if (req.url == '/nifty') {
        requestify.request('https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY', {
            method: 'GET',
            headers: headers,
            dataType: 'json'
        }).then(function (response) {
            res.end(response.getBody());
        }).catch(err => {
            res.end('error')
        })
    }
})
app.use('/', router)

app.listen(port, () => {
    console.log(port)
})
