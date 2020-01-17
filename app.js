const express = require('express')
const session = require('express-session')

const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// var indexRouter = require('./routes/index')
const cors = require('cors')
const users = require('./routes/users.js')
const article = require('./routes/article')
const topic = require('./routes/topic')
const comment = require('./routes/comment')
const bodyParser = require('body-parser') // pour parser les requêtes POST

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/tp4')

var app = express()

// 允许跨域
/* app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods',
    'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method == 'OPTIONS') res.send(200)
  else next()
}) */
// sessions dans la version de développement
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000' // si votre port est différent, changez cette valeur !
}))

app.use(bodyParser.urlencoded({ extended: false })) // for simple form posts
app.use(bodyParser.json()) // for API requests

app.use(session({
  secret: 'mydirtylittlesecret',
  name: 'sessId'
}))

app.use('/user', users) // 使用这个路由给user
app.use('/article', article)
app.use('/topics', topic)
app.use('/comments', comment)

app.get('/', (req, res) => {
  res.send('ok')
})

const sha256 = require('js-sha256')
app.get('/test', (req, res) => {
  const time = Date.now()
  res.send(sha256(time.toString() + 'qaqa'))
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app
