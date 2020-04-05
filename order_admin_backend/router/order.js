const Router = require('koa-router')
const router = new Router({prefix: '/order'})
const { findAll_Paging, findAll_notPaging, findById, edit, remove } = require('../controller/order')

router.get('/findAllPaging', findAll_Paging)
router.get('/findAllnotPaging', findAll_notPaging)
router.get('/show', findById)
router.post('/edit', edit)
router.get('/remove', remove)

module.exports = router