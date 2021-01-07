
const { resolveInclude } = require('ejs');
const express = require('express');
const { check, validationResult } = require('express-validator');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db-dev.sqlite3');

module.exports = {

    displayLogin: () => {
        const data = {
            content: '',
            title: 'Login',
        }
        return new Promise((resolve, reject) => {
            resolve(data);
        })
    },

    validateLogin: (req, res, next) => {
        return new Promise((resolve, reject) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let result = '<div><ul class="text-center list-unstyled text-danger">';
                const result_arr = errors.array();
                for (let n in result_arr) {
                    result += '<li>' + '※ ' + result_arr[n].msg + '</li>'
                }
                result += '</ul></div>';
                const data = {
                    title: 'Login',
                    content: result,
                    form: req.body,
                    path: 'login'
                }
                resolve(data)
            }
            else {
                const data = "SELECT * FROM Users WHERE pass ='" + req.body.pass + "'and mail ='" + req.body.mail + "'";
                db.all(data, (err, usr) => {
                    console.log(usr)
                    if (usr.length === 0) {
                        const data = {
                            title: 'Login',
                            content: '<p class="text-center text-danger">※ 未登録のメールアドレスです</p>',
                            path: 'login',
                        }
                        resolve(data)
                    } else {
                        let mau = usr[0].name
                        const data = {
                            content: mau,
                            title: 'DashBoard',
                            path: 'home',
                        }
                        resolve(data)
                    }
                })
            }
        })
    },

    displayRegister: () => {
        const data = {
            title: 'Register',
            content: null,
            form: '',
            err: null
        }
        return new Promise((resolve, reject) => {
            resolve(data);
        })
    },

    validateRegister: (req, res, next) => {
        return new Promise((resolve, reject) => {
            const errors = validationResult(req);
            const form = {
                name: req.body.name,
                pass: req.body.pass,
                mail: req.body.mail,
            };

            if (!errors.isEmpty()) {
                let result = '<div><ul class="text-center list-unstyled text-danger">';
                const result_arr = errors.array();
                for (let n in result_arr) {
                    result += '<li>' + '※ ' + result_arr[n].msg + '</li>'
                }
                result += '</ul></div>';
                const data = {
                    title: 'Login',
                    content: result,
                    form: req.body,
                    path: 'add'
                }
                    resolve(data);
            }
            else {
                db.serialize(() => {
                    const data = "SELECT * FROM Users WHERE mail = " + "'" + req.body.mail + "'";
                    db.all(data, (err, usr) => {
                        if (usr.length !== 0) {
                            const data = {
                                title: 'Register',
                                form: req.body,
                                content: '<p class="text-ctenter text-danger">' + '※ 既に登録済みのメールアドレスです' + '</p>',
                                path: 'add'
                            }
                                resolve(data);
                        }
                        else {
                            const data = {
                                content: usr,
                                title: 'DashBoard',
                                path: 'home'
                            }
                                resolve(data);
                        }
                    })
                })
            }
        })
    },

    displayDashboard: (req, res, next) => {
        const data = {
            content: req,
            title: 'DashBoard',
        }
        return new Promise((resolve, reject) => {
            resolve(data);
        })

    },



}
