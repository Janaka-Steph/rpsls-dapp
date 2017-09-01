import * as React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import MoveForm from '../../components/MoveForm'
import Balances from '../../components/Balances'
import Timeout from '../../components/Timeout'

interface Props {
  onMoveSubmit: () => {},
  onP2TimeoutSubmit: () => {},
  p1balance: string,
  p2balance: string,
}
interface State {}

class JoinGameContainer extends React.Component<Props, State> {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const {
      onMoveSubmit,
      onP2TimeoutSubmit,
      p1balance,
      p2balance,
    } = this.props

    return (
      <div id="rps-page">
        <div className="row">
          <div className="col-6">
            <h1>Join a game</h1>
          </div>
          <div className="col-6">
            <Link className="pull-right" to={'/'}>{'Go Back'}</Link>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h2>Player's balances</h2>
            <Balances
              p1balance={p1balance}
              p2balance={p2balance}
            />
          </div>
        </div>

        <div className="row m-top-50">
          <div className="col">
            <Timeout
              onTimeoutSubmit={onP2TimeoutSubmit}
            />
          </div>
        </div>

        <div className="row m-top-50 m-btm-50">
          <div className="col">
            <h2>Player 2 submit a move</h2>
            <MoveForm
              onSubmit={onMoveSubmit}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hash: state.rps.hash,
    errors: state.rps.errors,
    p1balance: state.user.balance,
    p2balance: state.user.p2balance,
    txs: state.rps.txs,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onMoveSubmit: (values) => dispatch({type: 'TX_MOVE_SUBMISSION_REQUESTED', values}),
    onP2TimeoutSubmit: () => dispatch({type: 'TX_P2_TIMEOUT_SUBMISSION_REQUESTED'}),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(JoinGameContainer)