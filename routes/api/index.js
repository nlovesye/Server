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

router.get('/test', async function (ctx, next) {
  const userModel = new mongoose.Schema({
    name: 'String',
    age: 'Number',
    sex: 'String'
  })
  const User = mongoose.model('User', userModel, 'user')
  const query = User.find({})
  query.select('name age sex')
  try {
    const rt = await query.exec()
    console.log('rt', rt)
    ctx.body = rt
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
