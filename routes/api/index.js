const router = require('koa-router')()
const mongo = require('../../db')
const jwt = require('jsonwebtoken')

const user = require('./user')
const general = require('./general')

router.prefix('/api')

router.get('/test', async function (ctx, next) {
    const rt = await mongo.find('USER', {}, 'userName nickName')
    ctx.body = rt
})

router.post('/login', async function (ctx, next) {
    const {
        userName,
        password
    } = ctx.request.body
    const user = await mongo.findOne('USER', { userName }, 'userName nickName password')
    if (!user) {
        throw '用户名不存在！'
    }
    if (password !== user.password) {
        throw '密码错误！'
    }
    const exp = Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    const token = jwt.sign({
        exp,
        userName: user.userName,
        nickName: user.nickName,
    }, ctx._meta.secretPrivateKey)
    // console.log('req', ctx.request.body, user)
    ctx.body = {
        token,
        nickName: user.nickName,
        exp
    }
})

module.exports = {
    router,
    user,
    general
}
