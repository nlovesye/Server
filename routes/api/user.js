const router = require('koa-router')()
const db = require('../../db')

router.prefix('/api/user')

router.get('/', function (ctx, next) {
  db.find('user', {}, 'username', function(err, rt) {
    console.log('rt2', rt)
    ctx.body = rt
  })
  ctx.body = 'thishits is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
