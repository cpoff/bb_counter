var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(express.static(__dirname));

var groceries = [{'name':'milk', 'price':'2', 'quant':'1', 'id':'0'}];

app.get('/groceries/:id', function (req, res) {
    var id = req.params.id;
    res.send(JSON.stringify({value : groceries[id], groceries:groceries}));
});

app.put('/groceries/:id', function (req, res) {
    var obj = {name:req.body.name, price:req.body.price, quant:req.body.quant, id:req.body.id};
    var id = req.params.id;
    groceries[id] = obj;
    console.log(groceries);
    res.end(JSON.stringify({id:id}))
});

app.get('/groceries', function (req, res) {
    res.send(groceries);
});

//add destroy route
app.delete('/groceries/:id', function (req, res) {
    var id = req.params.id;
    delete groceries[id];
    console.log(groceries);
    res.end('{}')
});

app.listen(3000, function () {
    console.log("server says get some");
});

//delete http route handler