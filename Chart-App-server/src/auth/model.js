var mongoose = require('mongoose')
// var uniqueValidator = require('mongoose-unique-validator');

var authSchema = new mongoose.Schema({
    Username: String,  
    email: String,
    password :String,
    confirmPassword :String
});
var authModel = mongoose.model('authModel', authSchema);

module.exports = authModel;
// authSchema.plugin(uniqueValidator);
// authSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

