var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})
router.get('/info', function (req, res, next) {
  res.send('respond with a resource info吼')
})

module.exports = router
