var express = require('express');
var app = express();
fs = require('fs');
var cors = require('cors');


//for cross doimain authentication
app.use(cors());

app.get('/zipcodes', function (req, res) {
    fs.readFile('zipcode.json', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        res.send(data)
    });

})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})