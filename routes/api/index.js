const router = require('koa-router')()
const db = require('../../db')

const user = require('./user')

router.prefix('/api')

router.get('/test', async function (ctx, next) {
  try {
    db.find('user', {}, 'username password', function(err, rt) {
      console.log('rt2', rt)
      ctx.body = rt
    })
  } catch (error) {
    console.log('err', error)
    ctx.body = 'fail!'
  }
})

router.post('/login', function (ctx, next) {
  console.log('req', ctx.request.body, JSON.stringify(ctx.request.body))
  ctx.body = 'this is a users respon22se!'
})

module.exports = {
    router,
    user
}
