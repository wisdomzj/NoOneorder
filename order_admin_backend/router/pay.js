const Router = require('koa-router')
const router = new Router({prefix: '/pay'})
const { dopay, alipayNotify } = require('../controller/pay')

router.post('/dopay', dopay)
router.post('/alipayNotify', alipayNotify)


module.exports = router