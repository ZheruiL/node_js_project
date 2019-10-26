var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const async = require('async')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
const catalogRouter = require('./routes/catalog')

var app = express()

// Connection db
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'myproject'

// Create a new MongoClient
const client = new MongoClient(url)

// Use connect method to connect to the Server
client.connect(function (err) {
  assert.strictEqual(null, err)
  console.log('Connected successfully to server')

  const db = client.db(dbName)

  client.close()
})

const insertDocuments = function (db, callback) {
  // Get the documents collection
  const collection = db.collection('documents')
  // Insert some documents
  collection.insertMany([
    { a: 1 }, { a: 2 }, { a: 3 }
  ], function (err, result) {
    assert.strictEqual(err, null)
    assert.strictEqual(3, result.result.n)
    assert.strictEqual(3, result.ops.length)
    console.log('Inserted 3 documents into the collection')
    callback(result)
  })
}

let docss = ''

const findDocuments = function (db, callback) {
  // Get the documents collection
  const collection = db.collection('documents')
  // Find some documents
  collection.find({}).toArray(function (err, docs) {
    assert.equal(err, null)
    console.log('Found the following records')
    console.log(docs)
    docss += docs
    callback(docs)
  })
}

// Use connect method to connect to the server
/* client.connect(function (err) {
  assert.equal(null, err)
  console.log('Connected correctly to server')

  const db = client.db(dbName)
  findDocuments(db, function () {
    client.close()
  })
}) */

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/catalog', catalogRouter)

app.get('/test', function (req, res) {
  res.send('Hello World!' + docss)
})

module.exports = app
