var express = require('express')
var session = require('express-session')

var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
const users = require('./routes/users.js')
const article = require('./routes/article')
const bodyParser = require('body-parser') // pour parser les requêtes POST

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/tp4')

var app = express()

app.use(bodyParser.urlencoded({ extended: false })) // for simple form posts
app.use(bodyParser.json()) // for API requests

app.use(session({
  secret: 'mydirtylittlesecret',
  name: 'sessId'
}))

app.use('/user', users) // 使用这个路由给user
app.use('/article', article)

app.get('/', (req, res) => {
  res.send('ok')
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app
