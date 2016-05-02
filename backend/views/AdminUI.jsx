import React from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000');

type Props = {

};
export class AdminUi extends React.Component {
  props: Props;

  constructor (props) {
    super(props);
    this.state = {
      clients: []
    }
  }

  componentDidMount () {
    socket.on('joined', (data) => {
      this.setState({
        clients: data
      })
    })
  }

  render () {
    const { clients } = this.state
    console.log(clients)
    return (
      <div>
        <h1>Admin Ui</h1>
        <h2>{`Active clients: ${clients.length}`}</h2>
      </div>
    )
  }
}

export default AdminUi
