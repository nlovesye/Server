module.exports = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        console.log('catchErr>>>>>>>', error)
        ctx.status = 500
        if (typeof error === 'string') {
            ctx.body = {
                code: 500,
                message: error
            }
        } else {
            ctx.status = error.status || 500
            ctx.body = {
                code: ctx.status,
                message: error.message || '服务器错误！'
            }
        }
    }
}