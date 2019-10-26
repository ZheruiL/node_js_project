const express = require('express')
const router = express.Router()

// 导入控制器模块
// const book_controller = require('../controllers/bookController')
const authorController = require('../controllers/authorController')
// const genre_controller = require('../controllers/genreController')
// const book_instance_controller = require('../controllers/bookinstanceController')

/// 藏书路由 ///

// GET 获取藏书编目主页
router.get('/', authorController.index)

// GET 请求添加新的藏书。注意此项必须位于显示藏书的路由（使用了 id）之前。
router.get('/author/create', authorController.author_create_get)

// POST 请求添加新的藏书
router.post('/author/create', authorController.author_create_post)

// GET 请求删除藏书
router.get('/author/:id/delete', authorController.author_delete_get)

// POST 请求删除藏书
router.post('/author/:id/delete', authorController.author_delete_post)

// GET 请求更新藏书
router.get('/author/:id/update', authorController.author_update_get)

// POST 请求更新藏书
router.post('/author/:id/update', authorController.author_update_post)

// GET 请求藏书
router.get('/author/:id', authorController.author_detail)

// GET 请求完整藏书列表
router.get('/authors', authorController.author_list)

/// 藏书副本、藏书种类、作者的路由与藏书路由结构基本一致，只是无需获取主页 ///

module.exports = router
