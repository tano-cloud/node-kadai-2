const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const db = require('../models/index');

/* GET users listing. */
router.get('/', (req, res, next)=> {
  const data = {
    content: '',
    title: 'Login',
 }
 res.render('users/login', data);
});

router.post('/',[
  check('pass', '7文字以上で入力してください').isLength({ min: 7 }),
  check('mail', '有効なメールアドレスではありません').isEmail(),
], (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      var result = '<div><ul class="text-center list-unstyled text-danger">';
      const result_arr = errors.array();
      for(var n in result_arr) {
        result += '<li>' +'※ '+ result_arr[n].msg + '</li>'
      }
      result += '</ul></div>';
      const data = {
        title: 'Login',
          content: result,
          form: req.body
      }
      res.render('users/login', data);
  } 
  
  db.User.findOne({
    where: {
      mail: req.body.mail,
      pass: req.body.pass,
    }
  }).then(usr=>{
    if (usr === null) {
      const data = {
        title:'Login',
        content:'<p class="text-center text-danger">※ 未登録のメールアドレスです</p>'
      }
      res.render('users/login', data);
    } else {
      const data = {
        content:usr.dataValues.name,
        title:'DashBoard',
     }
     res.render('users/home', data);
    }
  })
});

router.get('/add', (req, res, next)=> {
    var data = {
      title: 'Register',
      content: null,
      form: new db.User(),
      err:null
    }
    res.render('users/add', data);
  });
  
  router.post('/add', [
    check('name', '名前を入力してください').notEmpty(),
    check('pass', 'パスワードを7文字以上で入力してください').isLength({ min: 7 }),
    check('pass', 'パスワード（確認）と一致しません').custom((value, {req})=>{
      return req.body.pass === req.body.confirmPass
    }),
    check('mail','有効なメールアドレスではありません').isEmail(),
  ], (req, res, next)=> {
    const errors = validationResult(req);

    const form = {
      name: req.body.name,
      pass: req.body.pass,
      mail: req.body.mail,
    };

    if (!errors.isEmpty()) {
      var result = '<div><ul class="text-center list-unstyled text-danger">';
      const result_arr = errors.array();
      for(var n in result_arr) {
        result += '<li>' +'※ '+ result_arr[n].msg + '</li>'
      }
      result += '</ul></div>';
      const data = {
        title:'Login',
          content: result,
          form: req.body
      }
    res.render('users/add', data);
    }

db.User.findOne({
  where:{
    mail:req.body.mail,
  }
}).then(usr=>{
  if(usr !== null){
    const data = {
      title: 'Register',
      form: req.body,
      content:'<p class="text-center text-danger">'+'※ 既に登録済みのメールアドレスです'+'</p>'
    }
    res.render('users/add', data)
    }else{
      db.sequelize.sync().then(()=>db.User.create(form).then(usr=> {
        const data = {
          content: req.body.name,
          title: 'DashBoard',
       }
        res.render('users/home',data)
      }))
    }
      
  })
});

  /* GET users listing. */
router.get('/home',(req, res, next)=> {
  
  const data = {
    content:req,
    title:'DashBoard',
 }
 res.render('users/home', data);
});

module.exports = router;
