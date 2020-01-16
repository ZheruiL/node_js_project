const express = require('express')

// chargement du modèle User
const User = require('../models/user.model.js') // User类
const Comment = require('../models/comment.model')

const router = express.Router()

// 添加comment
router.post('/', async (req, res) => {
  // req = JSON.stringify(req.body)
  // await p1 = new Product(productId, req.body.name, req.body.type, req.body.price, req.body.rating, req.body.warrantyYears, req.body.available)
  if (req.body._topic == null) {
    res.status(400).send('topic id is required')
    return // 需要return停止
  }
  if (req.body.content == null) {
    res.status(400).send('content is required')
    return // 需要return停止
  }
  const result = await Comment.create(req.body._topic, req.body.content, req.body.parentId, req.session.userId)
  if (result.status === false) {
    res.status(400).send(result)
  } else {
    res.json({ result })
  }
})

// 获得评论列表
router.get('/:topicId', async (req, res) => {
  const comments = await Comment.find(req.params.topicId)
  res.json(comments)
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
