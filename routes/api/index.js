const router = require('koa-router')()
const mongoose = require('mongoose')
const config = require('../../config')

const user = require('./user')

router.prefix('/api')

const { port, host, dbName } = config.db
const dbURL = `mongodb://${host}:${port}/${dbName}`

mongoose.connect(dbURL)

const dbHandle = mongoose.connection
dbHandle.on('open', function (err) {
  if (err) {
    console.log('数据库连接失败', err)
    throw err
  }
  console.log('数据库连接成功')
})

router.post('/login', function (ctx, next) {
  console.log('req', ctx.request.body, JSON.stringify(ctx.request.body))
  ctx.body = 'this is a users respon22se!'
})

module.exports = {
    router,
    user
}
