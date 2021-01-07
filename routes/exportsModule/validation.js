
const { check, validationResult } = require('express-validator');

const checkLogin = () =>
[
    check('pass', 'パスワードを7文字以上で入力してください').isLength({ min: 7 }),
    check('mail','有効なメールアドレスではありません').isEmail()
 ]

const checkRegister = ()=>[
  check('name', '名前を入力してください').notEmpty(),
  check('pass', 'パスワードを7文字以上で入力してください').isLength({ min: 7 }),
  check('pass', 'パスワード（確認）と一致しません').custom((value, {req})=>{
    return req.body.pass === req.body.confirmPass
  }),
  check('mail','有効なメールアドレスではありません').isEmail()
]

  module.exports = {checkLogin:checkLogin, checkRegister:checkRegister};