const User = require('../models/user')

exports.signUp = function (req, res, next) {
  
  // req.body: 得到post请求body中的内容
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'})
  }
  
//  See if a user with the given email exists
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err)
    }

    //   If a user with email does exist, return an error
    if (existingUser) {
      // 422: Unprocessable Entity
      return res.status(422).send({ error: 'Email is in use'})
    }

    //  If a user with email does not exist, crete and save user record
    const user = new User({
      email: email,
      password: password
    });
    user.save(function (err) {
      if (err) {
        return next(err)
      }

      //  Respond to request indicating the user was created
      res.json({ success: true});
    })
  })
}