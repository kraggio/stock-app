const express = require("express");
const path = require('path');
const app = express();
const { engine } = require('express-handlebars');
const request = require('request');
//engine is a function we're bringing in

//creates a port for our server
const PORT = process.env.PORT || 7000;

// set middleware / use the documentation
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//make a request API
//api key: pk_3f7a2e30ee0944139f4b30f582d8b8b3

function call_api(finishedAPI) {
    request('https://cloud.iexapis.com/stable/stock/aapl/quote?token=pk_3f7a2e30ee0944139f4b30f582d8b8b3', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        if (res.statusCode === 200) {
            finishedAPI(body)
        }
    });
};

//set handlebar routes
app.get('/', function (req, res) {
    call_api(function (doneAPI) {
        res.render('home', {
            stock: doneAPI
        });
    });
});
app.get('/info', function (req, res) {
    res.render('info');
});

// set static path
app.use(express.static(path.join(__dirname, 'public')));



app.listen(PORT, () => console.log('listening on ' + PORT))


