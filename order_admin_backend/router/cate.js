const Router = require('koa-router')
const router = new Router({prefix: '/cate'})
const { findAll_Paging, findAll_notPaging, findById, edit, remove, add } = require('../controller/cate')

router.get('/findAllPaging', findAll_Paging)
router.get('/findAllnotPaging', findAll_notPaging)
router.get('/show', findById)
router.post('/edit', edit)
router.get('/remove', remove)
router.post('/add', add)

module.exports = router