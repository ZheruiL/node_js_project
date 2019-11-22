const express = require('express')
const mongoose = require('mongoose')

// chargement du modèle User
const User = require('../models/user.model.js') // User类
const Topic = require('../models/topic.model') // Article类

const router = express.Router()

/* add test article */
/* router.get('/test_add', async (req, res) => {
  // création d'une pseudo jointure
  const user = await User.findOne('biaoqq')

  const article = new Topic({
    _writer: user._id, // la référence se fait par l'id
    title: 'Un titre',
    content: 'Mon premier article',
    comments: []
  })
  article.save()

  res.send(article)
}) */

router.get('/test_add', async (req, res) => {
  await Topic.create('为什么我能在《死亡搁浅》的世界里逗留100小时？', '游研社： 我已经是30万赞的搁浅KOL了。 文 / 嘤肉卫星 看到这篇文章的时候，应该有不少玩家已经走上了“快递”或者“云快递”之旅了，对于《死亡搁浅》到底长什么样、怎么玩，应该也有了自己的理解。 我知道对于…')
  res.json('ok')
})

// 添加topic
router.post('/', async (req, res) => {
  // req = JSON.stringify(req.body)
  // await p1 = new Product(productId, req.body.name, req.body.type, req.body.price, req.body.rating, req.body.warrantyYears, req.body.available)
  if (req.body.title == null) {
    res.status(400).send('title is required')
    return // 需要return停止
  }
  await Topic.create(req.body.title, req.body.content)
  res.json({ status: 'ok' })
})

router.get('/', async (req, res) => {
  const topics = await Topic.find()
  res.json(topics)
})

// test find article
/* router.get('/test_find', async (req, res) => {
  // population du champ writer
  const user = await User.findOne('biaoqq')
  if (user == null) {
    res.json({ error: 'no result' })
    return
  }
  const article = await Article
    .findOne({ _writer: user._id }) // _writer comme étant un ObjectId
    .populate('_writer') // qu'on hydrate pour obtenir un User
    .exec()

  res.json(article)
}) */

module.exports = router
