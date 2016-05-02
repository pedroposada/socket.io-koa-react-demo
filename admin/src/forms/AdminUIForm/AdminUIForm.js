import React from 'react'
import { reduxForm } from 'redux-form'
import { Button,
  FormGroup,
  FormControl,
  HelpBlock,
  Row,
  Col,
  Badge } from 'react-bootstrap'

export const fields = ['specialty', 'message']

const validate = (values) => {
  const errors = {}
  if (!values.specialty || values.specialty === '') {
    errors.specialty = "Please select a specialty!"
  }
  if (!values.message) {
    errors.message = "A message is required!"
  }
  return errors
}

type Props = {
  handleSubmit: Function,
  fields: Object,
  Sockets: Object,
  onSendMessage: Function,
  resetForm: Function
};

export class AdminUIForm extends React.Component {
  props: Props;

  defaultProps = {
    fields: {},
    Sockets: {}
  }

  render() {
    const {
      fields: { specialty, message },
      handleSubmit,
      Sockets: { clients },
      onSendMessage,
      resetForm
    } = this.props

    return (
      <form onSubmit={handleSubmit((data) => {
        // action after validation
        onSendMessage(data.message)
        resetForm()
      })}>
        <FormGroup>
          <Badge>{`${clients.length} ${clients.length === 1 ? 'active client' : 'active clients'}`}</Badge>
        </FormGroup>
        <Row>
          <Col sm={5}>
            <FormGroup
              validationState={specialty.error && specialty.touched ? 'error' : 'success'}
              >
              <FormControl
                componentClass="select"
                {...specialty}
                value={specialty.value || ''}
                >
                <option value=''>Select specialty</option>
                <option value='Cardiology'>Cardiology</option>
                <option value='Oncology'>Oncology</option>
              </FormControl>
              <HelpBlock>{specialty.error && specialty.touched && specialty.error}</HelpBlock>
            </FormGroup>
          </Col>
          <Col sm={5}>
          <FormGroup
            validationState={message.error && message.touched ? 'error' : 'success'}
            >
              <FormControl
                type="text"
                placeholder="Enter message"
                {...message}
                />
              <HelpBlock>{message.error && message.touched && message.error}</HelpBlock>
            </FormGroup>
          </Col>
          <Col sm={2}>
            <Button
              bsStyle='primary'
              type='submit'
              block
              >Send</Button>
          </Col>
        </Row>
      </form>
    )
  }
}

AdminUIForm = reduxForm({
  form: 'AdminUIForm',
  fields,
  validate
})(AdminUIForm)

export default AdminUIForm
