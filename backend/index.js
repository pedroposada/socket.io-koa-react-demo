import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from 'koa-cors'
import dateformat from 'dateformat'
import IO from 'koa-socket'
// import mongoose from 'mongoose'
// import { default as koajwt } from 'koa-jwt'
import convert from 'koa-convert'
import routes from './routes'
import react from 'koa-react-view'
import serve from 'koa-static'

// export const JWT_SECRET = 'my secret'
// export const JWT_TTL = 60*60*5 // time in seconds

/**
  * Error handling - function to display stack trace and line numbers in terminal
*/
const dumpError = (err) => {
  if (typeof err === 'object') {
    if (err.message) {
      console.log('\nMessage: ' + err.message)
    }
    if (err.stack) {
      console.log('\nStacktrace:')
      console.log('====================')
      console.log(err.stack)
    }
  } else {
    console.log('dumpError :: argument is not an object')
  }
}

/**
 * init App
 */
// const app = koa()
const app = new Koa()
const io = new IO()

/**
 * error handling
 */
app.use(async (ctx, next) => {
  const start = new Date
  try {
    await next()
    const ms = new Date - start
    console.log(`[${dateformat(start, 'isoDateTime')}] ${ctx.method} ${ctx.url} - ${ms}ms`)
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = {
      message: err.message,
      status: err.status
    }
    if (process.env === 'development') {
      dumpError(err)
    }
  }
})

/**
 * CORS support
 */
app.use(convert(cors({
  origin: true,
  methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'DELETE'],
  credentials: true
})))

/**
 * parse request body into js object
 */
app.use(convert(bodyParser()))

/**
 * connect db
 */
// mongoose.connect('127.0.0.1:27017/todosdemo')

/**
 * JWT authentication control
 * all paths protected by default
 */
// app.use(convert(koajwt({ secret: JWT_SECRET }).unless({ path: [
//   // add unprotected paths here
//   // /regex for path/, ...

//   /^\/api\/login/,
//   /^\/favicon.ico/,
// ]})))

/**
 * server static files
 */
app.use(convert(serve('static')))


/**
 * Sockets
 */
io.attach( app )

io.use( async (ctx, next ) => {
  const start = new Date()
  await next()
  console.log( `[${dateformat(start, 'isoDateTime')}] ${ctx.event} - ${ new Date() - start }ms` )
})

const clients = new Map()
let xnumber, xnumbermsg

io.on('client join', (ctx, data) => {
  clients.set(data.id, data)
  io.broadcast('active clients', [...clients.values()])
  if (clients.size === xnumber) {
    io.broadcast('data from server', xnumbermsg)
  } else {
    io.broadcast('data from server', '')
  }
})

io.on('admin join', (ctx, data) => {
  io.broadcast('active clients', [...clients.values()])
  io.broadcast('active xnumbermsg', xnumbermsg)
})

io.on('data from admin', (ctx, message) => {
  io.broadcast('data from server', message)
})

io.on('settings from admin', (ctx, settings) => {
  xnumbermsg = settings.xnumbermsg
  xnumber = Number(settings.xnumber)
  if (clients.size === xnumber) {
    io.broadcast('data from server', xnumbermsg)
  } else {
    io.broadcast('data from server', '')
  }
})

io.on('client disconnect', (ctx, data) => {
  clients.delete(data.id)
  io.broadcast('active clients', [...clients.values()])
  if (clients.size < xnumber) {
    io.broadcast('data from server', '')
  }
})
/**
 * REST routes
 * from routes/index.js
 */
const router = new Router()
routes(router)
app
  .use(router.routes())
  .use(router.allowedMethods())

/**
 * render files with react
 * this.render(viename, props)
 */
const viewspath = `${__dirname}/views`
react(app, {
  views: viewspath,
  writeResp: true,
  internals: true
})

/**
 * Export app with middleware
 * usefull for unit testing and nested apps
 */
export default {
  app,
  io
}

/**
 * Start server
 */
const port = process.env.PORT || 5000
app.listen(port, (err) => {
  if (err) throw err;
  // feedback to console
  console.log(`Listening at http://localhost:${port}`)
})
