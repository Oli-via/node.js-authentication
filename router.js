/**
 * Created by aliyy on 2017/1/23.
 */
module.exports = function (app) {
  // next is use in error handling
  app.get('/', function (req, res, next) {
    res.send(['water bottle', 'phone', 'paper'])
  })
}