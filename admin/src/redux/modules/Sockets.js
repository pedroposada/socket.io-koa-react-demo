// Constants
export const CLIENTS = 'CLIENTS'
export const XNUMBERMSG = 'XNUMBERMSG'

// Action Creators
const clients = (clients) => ({ type: CLIENTS, clients })
const xnumbermsg = (msg) => ({ type: XNUMBERMSG, msg })

export const actions = {
  clients,
  xnumbermsg
}

// Reducer
export const initialState = {
  clients: new Map(),
  xnumbermsg: ''
}
export default function (state = initialState, action) {
  switch (action.type) {
    case CLIENTS:
      return Object.assign({}, state, { clients: action.clients })
    case XNUMBERMSG:
      // console.log(action)
      return Object.assign({}, state, { xnumbermsg: action.msg })
    default:
      return state
  }
}
