import * as React from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import {history} from '../../redux/createStore'
// Pages
import HomePage from '../HomeContainer'
import StartGamePage from '../StartGameContainer'
import JoinGamePage from '../JoinGameContainer'

interface Props {
  store: any
}
interface State {}

/**
 * RootContainer
 * Root component, core layout, route handling, web3 setup
 */
class RootContainer extends React.Component<Props, State> {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={history}>
          <div>
            <div className="container m-top-50">
              <div className="row">
                <div className="col-12">
                  <div>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/start-game" component={StartGamePage}/>
                    <Route exact path="/join-game" component={JoinGamePage}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}
export default connect()(RootContainer)