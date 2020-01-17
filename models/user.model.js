const mongoose = require('mongoose')
const Schema = mongoose.Schema
const sha256 = require('js-sha256')

var userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  salt: { type: String, required: true },
  passwordEncrypt: { type: String, required: true },
  dateCreate: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)

module.exports.getInfo = async function (_id) {
  try {
    const user = await User.findOne({ _id: _id })
    return user
  } catch (err) {
    return null
  }
}

module.exports.findOne = async function (email, password) {
  try {
    // get salt
    const userSalt = await User.findOne({ email: email })
    const salt = userSalt.salt
    try {
      const user = await User.findOne({ email: email, passwordEncrypt: sha256(salt + password) })
      return user
    } catch (err) {
      return null
    }
  } catch (err) {
    // console.log('can not find the user')
    return null
  }
}

/* module.exports.findOne = async function (username) {
  try {
    const user = await User.findOne({ username: username })
    return user
  } catch (err) {
    console.log('can not find the user')
  }
} */

module.exports.insert = async function (username, email, password) {
  const time = Date.now()
  const salt = sha256(time.toString() + 'qaqa')

  try {
    const user = new User({
      username: username,
      email: email,
      salt: salt,
      passwordEncrypt: sha256(salt + password)
    })
    await user.save()
    return { user: user, error: '', status: true }
  } catch (err) {
    console.log(err)
    return { user: null, error: 'can not create the user, error: ' + err, status: false }
    // gérez les erreurs ici
  }
}

module.exports.User = User
