import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import io from 'socket.io-client'
import { actions as socketsActions } from 'redux/modules/Sockets'
import AdminUIForm from 'forms/AdminUIForm'

const socket = io('http://localhost:5000');

type Props = {
  Sockets: Object,
  onClients: Function
};
export class AdminUI extends React.Component {
  props: Props;

  componentDidMount () {
    // register listener
    socket.on('active clients', (clients) => {
      this.props.onClients(clients)
    })
    // call server
    socket.emit('admin join', {msg: 'admin joined'})
  }

  render() {
    return (
      <div>
        <h1>Admin UI</h1>
        <AdminUIForm {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { Sockets } = state
  return {
    Sockets
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onClients: (clients) => dispatch(socketsActions.clients(clients)),
    onSendMessage: (message) => socket.emit('data from admin', message)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUI)
