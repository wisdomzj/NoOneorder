const Router = require('koa-router')
const router = new Router({prefix: '/detail'})
const { findAll_Paging, findAll_notPaging } = require('../controller/detail')

router.post('/findAllPaging', findAll_Paging)
router.get('/findAllnotPaging', findAll_notPaging)

module.exports = router