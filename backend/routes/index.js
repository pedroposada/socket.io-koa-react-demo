// import model from '../models'
import * as actions from '../actions'



/**
 * ----------------------------- ROUTES --------------------
 */

const PREFIX = `/api`

export default (router) => {
  router.get(`${PREFIX}/socket-message`, actions.socketMessage())
}