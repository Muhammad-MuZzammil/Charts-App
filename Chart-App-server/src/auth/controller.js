
var express = require("express");
var authModel = require('./model');
var jwt = require('jsonwebtoken')

function getUserByEmail(email) {
    return new Promise(function (resolve, reject) {
        authModel.findOne({ email: email }, function (err, user) {
            if (err)
                reject(err);

            else
                resolve(user)
        })
    })

}
    function checkUserInDB(user , requiredFields) {

    let validationMessage = {
        isValid : true ,
        message : ''
    }

    requiredFields.forEach(function(field){
        if(!user[field]){
            validationMessage.isValid = false
            validationMessage.message = field +" field is required";
        }
    })    

    return validationMessage;

}

function createUser(user) {

    return new Promise(function (resolve, reject) {
        user = new authModel(user);
        console.log('user', user)
        user.save(function (err, user) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(user);
                return;
            }

        });
    })
}




var controller = {


    Login_user: function (req, res) {

        getUserByEmail(req.body.userEmail)
            .then(function (user) {
                console.log(user)
                if (user.email === req.body.userEmail && user.password === req.body.userPassword) {
                    var generateToken = jwt.sign({ email: req.body.userEmail }, 'Muzzammil')
                    res.send({
                        status: 200,
                        email: user.email,
                        username: user.Username,
                        token: generateToken
                    });

                    return;
                }
            }, function (err) {
                res.status(400).send({
                    status: 400,
                    text: 'Incorrect Email or Password',
                    // next(err)
                });
            })

    },


    Register_user: function (req, res) {
        var authBodyData = req.body;

        console.log('authBodyData.email', authBodyData.email)

        var validateData =  checkUserInDB(authBodyData , ['Username' , 'password' , 'email' , 'confirmPassword'])
        
        if(!validateData.isValid){
            res.send({
                status : 401 ,
                message : validateData.message 
            })
        }else{
            getUserByEmail(authBodyData.email)
            .then(function (user) {
                if (user) {
                    throw new Error('Email already exisit, expected email to be unique');
                }
                else {
                    return createUser(authBodyData);
                }
            })
            .then(function (user) {
                var generateToken = jwt.sign({ email: user.email }, 'Muzzammil')
                console.log(user)
                res.send({
                    status: 200,
                    authDataobj: user,
                    token: generateToken
                });
            })
            .catch(function (err) {
                res.status(400).send({
                    status: 400,
                    text: err.message,
                    // Error: err
                })
            })
        }

        // checkUserInDB(authBodyData)
        //     .then(function (user) {
        //         if (user)
        //             return 
                
        //         else
        //             throw new Error("user doesn't exist")
                
        //     })
            
    }

}
module.exports = controller;

