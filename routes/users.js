const express = require('express')

// chargement du modèle User
const User = require('../models/user.model.js') // User类

const router = express.Router()

/* router.post('/test', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne(email, password)
  res.json(user)
}) */

router.post('/login', async (req, res) => {
  const { email, password } = req.body // fields from the POST request
  if (req.session.userId) { // if userId has already been defined
    // res.status(401) //   we know that a previous login request
    res.send('you are already connected') //   has already succeeded
    return
  }
  // else, we verify the fields against users
  const user = await User.findOne(email, password)
  if (user) { // if the user if found
    req.session.userId = user.id // define the userId field of the session
    res.send('OK')
    return
  }
  res.status(401)
  res.send('didn’t find any user matching your id and password')
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.send('logout successful')
})

router.post('/register', async (req, res) => {
  // check if the user exist, if yes return 403
  const { username, email, password } = req.body // fields from the POST request
  const result = await User.insert(username, email, password)
  if (result.status === false) {
    res.status(400).send(result)
  } else {
    res.json(result)
  }
})

module.exports = router
