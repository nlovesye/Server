const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body')
const logger = require('koa-logger')

const defaultRouter = require('./routes')
const api = require('./routes/api')

// console.log('all router', defaultRouter, api)

// error handler
onerror(app)

// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
app.use(koaBody({
  multipart: true
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
for (const m in defaultRouter) {
  if (api.hasOwnProperty(m)) {
    const rt = api[m]
    app.use(rt.routes(), rt.allowedMethods())
  }
}
for (const m in api) {
  if (api.hasOwnProperty(m)) {
    const apiRouter = api[m]
    app.use(apiRouter.routes(), apiRouter.allowedMethods())
  }
}
// app.use(api.routes(), api.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
