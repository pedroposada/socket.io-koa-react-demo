import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from 'koa-cors'
import dateformat from 'dateformat'
import IO from 'koa-socket'
import convert from 'koa-convert'
import react from 'koa-react-view'
import serve from 'koa-static'

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
 * serve static files from "static" folder
 */
app.use(convert(serve(`${__dirname}/static`)))


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
 * export websocket with middleware
 */
export const websocket = io

/**
 * Start server
 */
const port = process.env.PORT || 5000
app.listen(port, (err) => {
  if (err) throw err;
  // feedback to console
  console.log(`Listening at http://localhost:${port}`)
})

/**
 * Export app with middleware
 */
export default app