/**
 * Created by aliyy on 2017/1/23.
 */
const Authentication = require('./controllers/authentication')


module.exports = function (app) {
  // next is use in error handling
  /*app.get('/', function (req, res, next) {
    res.send(['water bottle', 'phone', 'paper'])
  })*/

  app.post('/signup', Authentication.signUp)
}