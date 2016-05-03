import React from 'react'
import { reduxForm } from 'redux-form'
import { socket } from 'containers/AdminUI'
import { actions as socketsActions } from 'redux/modules/Sockets'
import {
  Button,
  FormGroup,
  FormControl,
  HelpBlock,
  Row,
  Col,
  Badge,
  Panel
} from 'react-bootstrap'

export const fields = ['xnumber', 'xnumbermsg']

const validate = (values) => {
  const errors = {}
  const { xnumber, xnumbermsg } = values
  if (!xnumbermsg) {
    errors.xnumbermsg = "A message is required!"
  }
  return errors
}

type Props = {
  handleSubmit: Function,
  fields: Object,
  initialXnumberMsg: Function,
  Sockets: Object
};
export class AdminUIForm2 extends React.Component {
  props: Props;

  defaultProps = {
    fields: {}
  }

  componentDidMount () {
    socket.on('active xnumbermsg', (msg) => {
      this.props.initialXnumberMsg(msg)
    })
  }

  render() {
    const { fields: { xnumber, xnumbermsg }, handleSubmit, Sockets, initialXnumberMsg } = this.props

    return (
      <form onSubmit={handleSubmit((data) => {
          socket.emit('settings from admin', data)
        })}>
        <Panel
          header='#2'
          footer='Automatically display a message when number of clients is reached'>
          <Row>
            <Col lg={5}>
              <FormGroup>
                <FormControl
                  componentClass="select"
                  {...xnumber}
                  >
                  <option value={1}>If 1 client is connnected then</option>
                  <option value={2}>If 2 clients are connected then</option>
                  >
                </FormControl>
              </FormGroup>
            </Col>
            <Col lg={5}>
              <FormGroup
                validationState={xnumbermsg.error && xnumbermsg.touched ? 'error' : 'success'}
                >
                <FormControl
                  type="text"
                  placeholder="display this message"
                  {...xnumbermsg}
                  />
                <HelpBlock>{xnumbermsg.error && xnumbermsg.touched && xnumbermsg.error}</HelpBlock>
              </FormGroup>
            </Col>
            <Col lg={2}>
              <Button
                bsStyle='primary'
                type='submit'
                block
                >Send</Button>
            </Col>
          </Row>
        </Panel>
      </form>
    )
  }
}

export default reduxForm({
    form: 'AdminUIForm2',
    fields,
    validate,
    overwriteOnInitialValuesChange: true
  },
  (state) => {
    return {
      initialValues: {
        xnumber: 1,
        xnumbermsg: state.Sockets.xnumbermsg
      }
    }
  },
  {
    initialXnumberMsg: socketsActions.xnumbermsg
  }
)(AdminUIForm2)
