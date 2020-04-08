const Router = require('koa-router')
const router = new Router({prefix: '/product'})
const { findAll, findById, showProduct, remove, edit, add } = require('../controller/product')

router.get('/findAll', findAll)
router.get('/findById', findById)
router.get('/showProduct/:id', showProduct)
router.post('/remove', remove)
router.post('/edit', edit)
router.post('/add', add)

module.exports = router