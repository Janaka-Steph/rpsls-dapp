import * as React from 'react'
import {connect} from 'react-redux'
import {Button} from 'reactstrap'
import {history} from '../../redux/createStore'
import Info from '../../components/common/Info'

/**
 * Home Page
 */
let HomePage = (props) => {
  const {
    ethereum,
    user,
  } = props

  // check host and name for metamask
  const {currentProvider: {host = null, constructor: {name = null} = {}} = {}} = window.web3 || {}

  return (
    <div id="home-page">
      <div className="row">
        <div className="col">
          <h2>Welcome to the Rock-Paper-Scissor-Lizard-Spoke Ethereum Dapp Game</h2>
        </div>
      </div>

      <div className="row m-top-50 m-btm-50">
        <div className="col-6">
          <Button
            block
            color="primary"
            onClick={() => history.push('/start-game')}
            outline
            size="lg"
          >
            {'Start a new game'}
          </Button>
        </div>
        <div className="col-6">
          <Button
            block
            color="primary"
            onClick={() => history.push('/join-game')}
            outline
            size="lg"
          >
            {'Join a game'}
          </Button>
        </div>
      </div>

      <Info
        defaultAccount={user && user.defaultAccount ? user.defaultAccount : 'No account detected'}
        balance={user && user.balance}
        blockNumber={ethereum && ethereum.blockNumber}
        contracts={ethereum && ethereum.contracts}
        currentProvider={host || name}
        isWeb3Connected={!!window.web3}
        network={ethereum && ethereum.network}
      />
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    ethereum: state.ethereum,
    user: state.user,
  }
}
export default connect(mapStateToProps)(HomePage)