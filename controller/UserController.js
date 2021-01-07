const express = require('express');
const { checkLogin, checkRegister } = require('../routes/exportsModule/validation');
const logic = require('../models/logic');
const viewUsers = './users/'

module.exports = {
    displayLogin: (req, res, next) => {
        logic.displayLogin().then((data)=>{
        res.render(viewUsers+'login', data);
    });
    },

    validateLogin: (req, res, next) => {
     logic.validateLogin(req, res, next).then((data)=>{
         res.render(viewUsers+data.path, data);
     });
    },


    displayRegister: (req, res, next)=>{
        logic.displayRegister().then((data)=>{
            res.render(viewUsers+'add', data);
        });
    },

    validateRegister: (req, res, next)=>{
        logic.validateRegister(req, res, next).then((data)=>{
            res.render(viewUsers+data.path, data);
        });
    },
    
    displayDashboard: (req, res, next)=>{
        logic.displayDashboard().then((data)=>{
            res.render(viewUsers+'home', data);
        });
    }
}
