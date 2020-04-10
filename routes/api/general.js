const router = require('koa-router')()
const db = require('../../db')

router.prefix('/api/general')

const table = 'GENERAL'

router.post('/', async function (ctx, next) {
    const data = ctx.request.body
    // console.log('post add', data)
    const ret = await db.findOne(table, { name: data.name })
    if (!!ret) {
        throw '武将名称已存在！'
    }
    const res = await db.save(table, data)
    ctx.body = res
})

router.put('/', async function (ctx, next) {
    const data = ctx.request.body
    // console.log('reqD', data)
    const ret = await db.findOne(table, { name: data.name })
    if (!ret) {
        throw '武将不存在！'
    }
    const res = await db.update(table, { name: data.name }, data)
    ctx.body = res
})

router.delete('/', async function (ctx, next) {
    const _id = ctx.request.body
    const res = await db.remove(table, { _id })
    ctx.body = res
})

router.get('/', async function (ctx, next) {
    const { pageNo, pageSize, ...conditions } = ctx.query
    const ret = await db.find(table, conditions, null, { pageNo, pageSize })
    ctx.body = ret || []
})

module.exports = router
