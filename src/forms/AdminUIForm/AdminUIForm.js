import React from 'react'
import { reduxForm } from 'redux-form'
import { Button,
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel } from 'react-bootstrap'

export const fields = []

const validate = (values) => {
  const errors = {}
  return errors
}

type Props = {
  handleSubmit: Function,
  fields: Object,
}

export class AdminUIForm extends React.Component {
  props: Props;

  defaultProps = {
    fields: {},
  }

  render() {
    const { fields, handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="formBasicText">
          <FormGroup controlId="formControlsSelectMultiple">
            <ControlLabel>Specialty</ControlLabel>
            <FormControl componentClass="select">
              <option value="other">Cardiology</option>
              <option value="other">Oncology</option>
            </FormControl>
          </FormGroup>
          <ControlLabel>Message</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter message"
          />
          <Button>Send message</Button>
        </FormGroup>
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
