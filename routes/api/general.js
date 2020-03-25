const router = require('koa-router')()
const db = require('../../db')

router.prefix('/api/general')

const table = 'GENERAL'

router.post('/', async function (ctx, next) {
  try {
    const data = ctx.request.body
    // console.log('reqD', data)
    const ret = await db.findOne(table, { name: data.name })
    if (!!ret) {
      ctx.body = '武将名称已存在！'
      return
    }
    const res = await db.save(table, data)
    ctx.body = res
  } catch (error) {
    console.log(error)
    ctx.body = 'fail'
  }
})

router.get('/', async function (ctx, next) {
  try {
    const ret = await db.find(table, null, null)
    ctx.body = ret || []
  } catch (error) {
    console.log(error)
    ctx.body = 'fail'
  }
})

module.exports = router
