import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import Sockets from 'redux/modules/Sockets'

export const reducers = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    form: formReducer,
    Sockets,
    ...asyncReducers })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(reducers(store.asyncReducers))
}

export default reducers
