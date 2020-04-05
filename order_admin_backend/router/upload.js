const Router = require('koa-router')
const router = new Router({prefix: '/upload'})
const { uploadfile } = require('../controller/upload')

router.post('/', uploadfile)

module.exports = router