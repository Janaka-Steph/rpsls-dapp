import * as React from 'react'
import {Button, Form} from 'reactstrap'
import {Field, reduxForm, reset} from 'redux-form'
import {Input} from '../common/Inputs'
import MoveChoices from '../MoveChoices'
// ------------------------------------
// Validation
// ------------------------------------
// const validate = values => {}
// ------------------------------------
// After Submit
// ------------------------------------
//
// ------------------------------------
// Form
// ------------------------------------
let MoveForm = (props) => {
  const {handleSubmit, onSubmit} = props
  return (
    <div id="MoveForm" className="form">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12">
            <Field
              component={Input}
              label="RPSAddress"
              name="RPSAddress"
              placeholder="Enter the RPS contract address"
              type="text"
            />
          </div>
        </div>

        <MoveChoices/>

        <div className="row">
          <div className="col-12">
            <Field
              component={Input}
              label="stake"
              name="stake"
              placeholder="Enter the stake"
              type="number"
            />
          </div>
        </div>

        <Button
          block
          color="primary"
          outline
          size="lg"
          type="submit"
        >
          {'Submit'}
        </Button>
      </Form>
    </div>
  )
}
export default MoveForm = reduxForm({
  form: 'MoveForm',
})(MoveForm)