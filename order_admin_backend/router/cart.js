const Router = require('koa-router')
const router = new Router({prefix: '/shopcart'})
const { list, add, addcount, reducecount } = require('../controller/cart')

router.get('/list', list)
router.post('/add', add)
router.get('/addcount',addcount)
router.get('/reducecount', reducecount)

module.exports = router