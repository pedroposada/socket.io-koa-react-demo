/* global socketClientWidgetConfig */
import config from 'config'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import io from 'socket.io-client'
import { actions as socketActions } from 'redux/modules/Sockets'
import ReactTransitionGroup from 'react-addons-css-transition-group'
import { Well } from 'react-bootstrap'

const socket = io(config.SOCKETSURL || 'http://localhost:5000')

type Props = {
  handleClick: Function,
  handleDataFromServer: Function,
  Sockets: Object
};
export class ClientWidget extends React.Component {
  props: Props;

  componentDidMount() {
    // register listener
    socket.on('data from server', (data) => {
      this.props.handleDataFromServer(data)
    })
    // call server
    socket.emit('client join', { msg: 'client joined', id: socketClientWidgetConfig.id })
    // resgister window listener
    window.addEventListener('beforeunload', function cb(event) {
      socket.emit('client disconnect', { msg: 'client disconnected', id: socketClientWidgetConfig.id })
      event.target.removeEventListener('beforeunload', cb)
    });
  }

  render() {
    const { handleClick, Sockets } = this.props
    return (
      <div
        style={{
          padding: '10px',
          backgroundImage: `url('${require('file!static/300x250.gif')}')`,
          backgroundRepeat: 'no-repeat',
          height: '250px',
          cursor: 'pointer',
          color: '#000'
        }}
        >
        <div>Demo Widget</div>
        {/* <button onClick={handleClick}>Emit socket event</button> */}
        <div
          style={{
            padding: '10px',
            color: '#000',
            fontSize: '30px'
          }}
          >{Sockets.fromServer}</div>
        {/* <ReactTransitionGroup
          // component={FirstChild}
          transitionName='someclass'
          // transitionEnter={true}
          transitionAppear={true}
          transitionAppearTimeout={30000}
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={2000}
          >
          <Well className='someclass' key={1}><h1>Do you need help?</h1></Well>
        </ReactTransitionGroup> */}
      </div>
    )
  }
}

class FirstChild extends React.Component {
  render () {
    const children = React.Children.toArray(this.props.children);
    return children[0] || null;
  }
};


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
