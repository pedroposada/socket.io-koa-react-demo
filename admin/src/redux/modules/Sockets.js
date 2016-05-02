// Constants
export const CLIENTS = 'CLIENTS'

// Action Creators
const clients = (clients) => ({ type: CLIENTS, clients })

export const actions = {
  clients
}

// Reducer
export const initialState = {
  clients: new Map()
}
export default function (state = initialState, action) {
  switch (action.type) {
    case CLIENTS:
      return Object.assign({}, state, { clients: action.clients })
    default:
      return state
  }
}
