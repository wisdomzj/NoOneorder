const Router = require('koa-router')
const router = new Router({prefix: '/category'})
const { findAll_Paging, findAll_notPaging, findcategory_allproduct, findById, edit, remove, add } = require('../controller/category')

router.get('/findAllPaging', findAll_Paging)
router.get('/findAllnotPaging', findAll_notPaging)
router.get('/findCate_allproduct', findcategory_allproduct)
router.get('/show', findById)
router.post('/edit', edit)
router.get('/remove', remove)
router.post('/add', add)

module.exports = router