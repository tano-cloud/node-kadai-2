const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const { checkLogin, checkRegister } = require('./exportsModule/validation');

router.get('/', userController.displayLogin);
router.post('/',checkLogin(), userController.validateLogin);

router.get('/add', userController.displayRegister);
router.post('/add',checkRegister(), userController.validateRegister);

router.get('/home', userController.displayDashboard);

module.exports = router;
