const Router = require('koa-router')
const router = new Router({prefix: '/order'})
const { findAll_Paging, findAll_notPaging, findById, show, edit, remove, add } = require('../controller/master')

router.get('/findAllPaging', findAll_Paging)
router.get('/findAllnotPaging', findAll_notPaging)
router.get('/findById', findById)
router.get('/show', show)
router.post('/edit', edit)
router.post('/add', add)
router.get('/remove', remove)

module.exports = router