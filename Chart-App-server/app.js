// Third Party Modules
var mongoose = require('mongoose');
// var ObjectId = require('mongodb').ObjectID;
var express = require('express');
var app = express();
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken')
var path = require('path');
var bodyParser = require('body-parser');

var ejs = require('ejs');

// MongoDB Connection
var mongoDB = mongoose.connect('mongodb://localhost:27017/chartApp');

app.use(express.static(path.join(__dirname, 'src')));

//  View Engine
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

// Middlewares
// app.set('views', path.join(__dirname, '../Chart-App-client/dist'));
app.use(express.static(path.join(__dirname, '../Chart-App-client/dist')));
app.use(express.static(path.join(__dirname, '../Chart-App-client/node-modules')));

// bodyParser Middelwares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST , PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
   next();
});

// Client Index.html
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../Chart-App-client/dist/index.html'));
});

// server port
var port = process.env.PORT || 4000;

// Require MongoDB Model
var authModel = require('./src/auth/model');
var chartModel = require('./src/chart/model');

// Chart Routes
var chartRouter = require('./src/chart/router')
var authRouter = require('./src/auth/router');

// route middleware to verify a token
chartRouter.use(function (req, res, next) {


    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.authorization || req.headers.authorization;

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, 'Muzzammil', function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

// chartRouter Middelware
app.use('/api/auth', authRouter)
app.use('/api/charts', chartRouter);

// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: err
//     });
// });

app.listen(port, function (req, res) {
    console.log('Server is  running on PORT: ', port);
})
