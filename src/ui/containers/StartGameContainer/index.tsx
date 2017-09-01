import * as React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {goBack} from 'react-router-redux'
import RPSDeployForm from '../../components/RPSDeployForm'
import SolveForm from '../../components/SolveForm'
import Balances from '../../components/Balances'
import Timeout from '../../components/Timeout'

interface Props {
  onDeploySubmit: () => {},
  onGenerateHashSubmit: () => {},
  onP1TimeoutSubmit: () => {},
  onSolveSubmit: () => {},
  p1balance: string,
  p2balance: string,
  salt: number,
}
interface State {}

class StartGameContainer extends React.Component<Props, State> {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const {
      onDeploySubmit,
      onSolveSubmit,
      onP1TimeoutSubmit,
      p1balance,
      p2balance,
      salt,
    } = this.props

    return (
      <div id="rps-page">
        <div className="row">
          <div className="col-6">
            <h1>Start A New Game</h1>
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
              onTimeoutSubmit={onP1TimeoutSubmit}
            />
          </div>
        </div>

        <div className="row m-top-50">
          <div className="col">
            <h2>Player 1 deploy a new RPSLS contract</h2>
            <RPSDeployForm
              onSubmit={onDeploySubmit}
            />
            <p className="m-top-10">{`Random salt (keep it safe in order to reveal your move): ${salt || ''}`}</p>
          </div>
        </div>

        <div className="row m-top-50 m-btm-50">
          <div className="col">
            <h2>Player 1 reveal its move</h2>
            <SolveForm
              onSubmit={onSolveSubmit}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    salt: state.rps.salt,
    errors: state.rps.errors,
    p1balance: state.user.balance,
    p2balance: state.user.p2balance,
    txs: state.rps.txs,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onDeploySubmit: (values) => dispatch({type: 'TX_RPS_DEPLOY_SUBMISSION_REQUESTED', values}),
    onSolveSubmit: (values) => dispatch({type: 'TX_SOLVE_SUBMISSION_REQUESTED', values}),
    onP1TimeoutSubmit: () => dispatch({type: 'TX_P1_TIMEOUT_SUBMISSION_REQUESTED'}),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StartGameContainer)