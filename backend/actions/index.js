import Server from '../index'

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
    Server.io.broadcast('data from server', msg)

    return ctx.body = ctx
  }
}