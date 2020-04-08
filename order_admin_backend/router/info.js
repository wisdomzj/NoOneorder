const Router = require('koa-router')
const router = new Router({prefix: '/info'})
const { show, edit, add } = require('../controller/info')

router.get('/show', show)
router.post('/edit', edit)
router.post('/add', add)

module.exports = router