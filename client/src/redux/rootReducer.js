import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import Sockets from 'redux/modules/Sockets'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  router,
  Sockets,
  form: formReducer
})
