const valid = require('./valid')
const catchErr = require('./catchErr')

const setSecretKey = async (ctx, next) => {
    ctx._meta = ctx._meta || {
        secretPrivateKey: 'ns'
    }
    await next()
}

module.exports = {
    setSecretKey,
    catchErr,
    valid,
}