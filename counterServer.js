
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var counter1 = 0;
var counter2 = 0;
var nextID = 2;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

app.get('/counter/1', function (req, res) {
    console.log("counter has been requested");
    res.send(JSON.stringify({value : counter1}));
});

app.put('/counter/1', function (req, res) {
    console.log(req.body.value);
    counter1 = req.body.value;
    res.end(JSON.stringify({}));
});

app.post('/counter/', function (req, res) {
    console.log(req.body.value);
    counter2 = req.body.value;
    res.send(JSON.stringify({id:nextID}));
    nextID++;
});

app.listen(3000, function () {
    console.log("server says get some");
});
