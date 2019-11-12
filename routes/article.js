const express = require('express')
const mongoose = require('mongoose')

// chargement du modèle User
const User = require('../models/user.model.js') // User类
const Article = require('../models/article.model') // Article类

const router = express.Router()

/* add test article */
router.get('/test_add', async (req, res) => {
  // création d'une pseudo jointure
  const user = await User.findOne('biaoqq')

  const article = new Article({
    _writer: user._id, // la référence se fait par l'id
    title: 'Un titre',
    content: 'Mon premier article',
    comments: []
  })
  article.save()

  res.send(article)
})

// test find article
router.get('/test_find', async (req, res) => {
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
})

module.exports = router
