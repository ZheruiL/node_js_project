const mongoose = require('mongoose')
const Schema = mongoose.Schema

var commentSchema = new Schema({
  _topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
  _creator: { type: Schema.Types.ObjectId, ref: 'User' },
  _parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
  content: { type: String, required: true },
  dateCreate: { type: Date, default: Date.now }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports.create = async function (_topic, content, _parent = null) {
  const user = { _id: null }
  try {
    const comment = new Comment({
      _topic: _topic,
      _creator: user._id, // la référence se fait par l'id
      content: content,
      _parent: _parent // 父类评论的id
    })
    await comment.save()
    return { commentId: comment._id, comment: comment, error: '' }
  } catch (err) {
    return { commentId: null, error: 'can not create the comment, error: ' + err }
  }
}

module.exports.find = async function (_topicId) {
  try {
    const comments = await Comment.find({ _topic: _topicId }).sort({ dateCreate: 'desc' }).exec()
    return { comments: comments, error: '' }
  } catch (err) {
    console.log('can not find any comment')
    return { topics: [], error: 'can not find any comment' }
  }
}

module.exports.delete = async function (_id) {
  try {
    await Comment.deleteOne({ _id: _id })
    return { status: true }
  } catch (err) {
    console.log('console.log can not find any topic')
    return ({ status: false, error: err })
  }
}

/* module.exports.findOne = async function (_id) {
  try {
    const topic = await Comment.findOne({ _id: _id })
    if (topic === null) {
      return { topic: topic, status: false, error: 'can not find any topic' }
    }
    return { topic: topic, status: true, error: '' }
  } catch (err) {
    console.log('can not find this topic' + _id)
    return { topic: null, status: false, error: 'can not find any topic' }
  }
} */

module.exports.Comment = Comment
