import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import Sockets from 'redux/modules/Sockets'

export default combineReducers({
  router,
  Sockets
})
