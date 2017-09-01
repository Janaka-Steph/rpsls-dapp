import * as React from 'react'
import {Button, Form} from 'reactstrap'

const Timeout = (props) => {
  const {onTimeoutSubmit} = props
  return (
    <div className="row">
      <div className="col-12">
        <Button
          block
          color="warning"
          onClick={() => onTimeoutSubmit()}
          outline
          size="lg"
          type="submit"
        >
          {'Ask Timeout to get your funds back'}
        </Button>
      </div>
    </div>
  )
}
export default Timeout