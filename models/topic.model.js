const mongoose = require('mongoose')
const Schema = mongoose.Schema

var topicSchema = new Schema({
  _creator: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, require: true },
  content: { type: String, required: true },
  dateCreate: { type: Date, default: Date.now },
  comments: [{
    _creator: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }]
})

const Topic = mongoose.model('Topic', topicSchema)

module.exports.create = async function (title, content) {
  /* const user = await User.findOne('biaoqq')

  const article = new Article({
    _writer: user._id, // la référence se fait par l'id
    title: 'Un titre',
    content: 'Mon premier article',
    comments: []
  })
  article.save() */
  const user = { _id: null }
  try {
    const topic = new Topic({
      _creator: user._id, // la référence se fait par l'id
      title: title,
      content: content,
      comments: []
    })
    await topic.save()
    return { topicId: topic._id, error: '' }
  } catch (err) {
    return { topicId: null, error: 'can not create the topic, error: ' + err }
  }
}

module.exports.delete = async function (_id) {
  try {
    await Topic.deleteOne({ _id: _id })
    return { status: true }
  } catch (err) {
    console.log('console.log can not find any topic')
    return ({ status: false, error: err })
  }
  /*
  await Topic.deleteOne({ _id: _id }, function (err) {
    if (err) {
      return ({ status: false, error: err })
    }
    // deleted at most one topic
    return { status: true }
  }) */
}

module.exports.find = async function () {
  try {
    const topics = await Topic.find({}).sort({ dateCreate: 'desc' }).exec()
    return { topics: topics, error: '' }
  } catch (err) {
    console.log('console.log can not find any topic')
    return { topics: null, error: 'can not find any topic' }
  }
}

module.exports.Topic = Topic
