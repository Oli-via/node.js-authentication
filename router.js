/**
 * Created by aliyy on 2017/1/23.
 */
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// tell passport to authenticate our user using the jwt strategy.
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignIn = passport.authenticate('local', {session: false});

module.exports = function (app) {
  // next is use in error handling
  /*app.get('/', function (req, res, next) {
    res.send(['water bottle', 'phone', 'paper'])
  })*/

  app.get('/', requireAuth, function (req, res) {
    res.send({message: 'Top Secrets Messages: '})
  });
  app.post('/signin', requireSignIn, Authentication.signin);
  app.post('/signup', Authentication.signUp)
}