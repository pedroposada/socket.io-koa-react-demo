import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import io from 'socket.io-client'
import { actions as socketActions } from 'redux/modules/Sockets'

const socket = io('http://localhost:5000');

type Props = {
  handleClick: Function,
  handleDataFromServer: Function,
  Sockets: Object
};
export class ClientWidget extends React.Component {
  props: Props;

  componentDidMount() {
    socket.emit('join', {msg: 'client joined'})
    socket.on('data from server', (data) => {
      this.props.handleDataFromServer(data)
    })
  }

  render() {
    const { handleClick, Sockets } = this.props
    return (
      <div>
        <h1>Client Widget Demo</h1>
        <button onClick={handleClick}>Emit socket event</button>
        <h2>{Sockets.fromServer}</h2>
      </div>
    )
  }
}

const mapStateToProps = ({ Sockets }) => {
  return {
    Sockets
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: (e) => {
      socket.emit('data from client', {msg: 'data from client'})
    },
    handleDataFromServer: (data) => dispatch(socketActions.dataFromServer(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientWidget)
