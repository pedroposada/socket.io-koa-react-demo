// Constants
const DATA_FROM_SERVER = 'DATA_FROM_SERVER'

// Action Creators
const dataFromServer = (data) => ({ type: DATA_FROM_SERVER, data })
export const actions = {
  dataFromServer
}

// Reducer
export const initialState = {
  data: '',
  fromServer: ''
}
export default function (state = initialState, action) {
  switch (action.type) {
    case DATA_FROM_SERVER:
      return Object.assign({}, state, { fromServer: action.data })
    default:
      return state
  }
}
