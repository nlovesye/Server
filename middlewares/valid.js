const jwt = require('jsonwebtoken')

module.exports = async (ctx, next) => {
    try {
        if (ctx.url === '/api/login') {
            await next()
        } else {
            const token = ctx.header['authorization']
            const rt = jwt.verify(token, ctx._meta.secretPrivateKey)
            // console.log('valid token', token, rt)
            await next()
        }
    } catch (error) {
        console.log('err', error)
        let status = 401
        let msg = ''
        if (error.name === 'TokenExpiredError') {
            msg = 'token已过期！'
        } else if (error.name === 'JsonWebTokenError') {
            switch (error.message) {
                case 'invalid signature':
                    msg = '错误token！'
                    break

                case 'jwt signature is required':
                    msg = 'token不能为空！'
                    break

                default:
                    msg = error.message
                    break
            }
        } else {
            status = 405
            msg = error
        }
        throw {
            status,
            message: msg
        }
    }
}