var async = require('async')
const Author = require('../models/author')

// 显示完整的作者列表 welcomePage
exports.index = (req, res) => { res.send('未实现：欢迎页面') }

// 显示完整的作者列表
/* exports.author_list = function (req, res, next) {
  Author.find({}, 'title author')
    .populate('author')
    .exec(function (err, listAuthor) {
      if (err) { return next(err) }
      // Successful, so render
      // res.render('Authorlist', { title: 'Book List', book_list: listAuthor })
      res.json([123])
    })
} */
exports.author_list = function (req, res, next) {
  Author.find({}, 'first_name')
    .exec(function (err, listAuthor) {
      if (err) { return next(err) }
      // Successful, so render
      // res.render('book_list', { title: 'Book List', book_list: list_books });
      console.log(123)
      console.log(listAuthor)
      res.json(listAuthor)
    })
}

// 为每位作者显示详细信息的页面
// exports.author_detail = (req, res) => { res.send('未实现：作者详细信息：' + req.params.id) }

// Display detail page for a specific Author.
exports.author_detail = function (req, res, next) {
  async.parallel({
    author: function (callback) {
      /* Author.findById(req.params.id)
        .exec(callback) */
      Author.find()
        .exec(callback)
    }
  }, function (err, results) {
    if (err) { return next(err) } // Error in API usage.
    if (results.author == null) { // No results.
      var err = new Error('Author not found')
      err.status = 404
      return next(err)
    }
    // res.json(results.author)
    res.send('未实现：作者创建表单的 GET')
    // Successful, so render.
    // res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books })
  })
}

// 由 GET 显示创建作者的表单
exports.author_create_get = (req, res) => { res.send('未实现：作者创建表单的 GET') }

// 由 POST 处理作者创建操作
exports.author_create_post = (req, res) => { res.send('未实现：创建作者的 POST') }

// 由 GET 显示删除作者的表单
exports.author_delete_get = (req, res) => { res.send('未实现：作者删除表单的 GET') }

// 由 POST 处理作者删除操作
exports.author_delete_post = (req, res) => { res.send('未实现：删除作者的 POST') }

// 由 GET 显示更新作者的表单
exports.author_update_get = (req, res) => { res.send('未实现：作者更新表单的 GET') }

// 由 POST 处理作者更新操作
exports.author_update_post = (req, res) => { res.send('未实现：更新作者的 POST') }
