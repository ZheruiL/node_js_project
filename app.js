const express = require('express')
var bodyParser = require('body-parser') // get post param
const app = express()
const cors = require('cors')
const fs = require('fs')
const Product = require('./models/product')
let productId = 5

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

let products
fs.readFile('Products.json', (err, data) => {
  if (err) throw err
  data = JSON.parse(data)
  products = data.map((ele) => {
    return new Product(ele._id, ele.name, ele.type, ele.price, ele.rating, ele.warrantyYears, ele.available)
  })
})

app.get('/test', (req, res) => {
  const p1 = new Product('name', 'type', 'price', 'rating', 'warrantyYears', 'available')
  res.json(p1)
})
app.get('/products', (req, res) => {
  res.json(products)
})
app.post('/product', (req, res) => {
  // req = JSON.stringify(req.body)
  const p1 = new Product(productId, req.body.name, req.body.type, req.body.price, req.body.rating, req.body.warrantyYears, req.body.available)
  products.push(p1)
  productId++
  res.json({ status: 'ok' })
})
app.put('/product/:id', (req, res) => {
  const foundIndex = products.findIndex(function (element) {
    return Number(element._id) === Number(req.params.id)
  })
  if (foundIndex !== -1) {
    products[foundIndex] = new Product(req.body.id, req.body.name, req.body.type, req.body.price, req.body.rating, req.body.warrantyYears, req.body.available)
    res.json({ status: 'ok' })
    // res.json(found)
  } else {
    res.status(404).send('Not Found')
  }
})
app.delete('/product/:id', (req, res) => {
  const foundIndex = products.findIndex(function (element) {
    return Number(element._id) === Number(req.params.id)
  })
  if (foundIndex !== -1) {
    products.splice(foundIndex, 1)
    res.json({ status: 'ok' })
    // res.json(found)
  } else {
    res.status(404).send('Not Found')
  }
})
app.get('/product/:id', (req, res) => {
  const found = products.find(function (element) {
    return Number(element._id) === Number(req.params.id)
  })
  if (found) {
    res.json(found)
  } else {
    res.status(404).send('Not Found')
  }
})

module.exports = app
