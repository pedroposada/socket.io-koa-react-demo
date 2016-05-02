import Server, { activeClients } from '../index'

/**
 * ------------------------ ACTIONS -----------
 */

/**
 * Validate credentials and return JWT on success
 * @return {Function} next  [generator function]
 */
export const socketMessage = () => {
  return async (ctx, next) => {
    await next()
    let result

    const { msg } = ctx.request.query
    await Server.io.broadcast('data from server', msg)
  }
}

/**
 * Send feedback
 * @return {Function} next  [generator function]
 */
export const adminUI = () => {
  return async (ctx, next) => {
    await next()
    let result

    // pass props to views/AdminUI.jsx
    ctx.render('AdminUI', {})
  }
}