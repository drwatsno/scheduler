import React from 'react'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { render } from 'react-dom'
import { Login, Signup} from './auth'
import Index from './index'
import About from './about'
let socketIOClient = require('socket.io-client');
let sailsIOClient = require('sails.io.js');

// Instantiate the socket client (`io`)
// (for now, you must explicitly pass in the socket.io client when using this library from Node.js)
let io = sailsIOClient(socketIOClient);

// Set some options:
// (you have to specify the host and port of the Sails backend when using this library from Node.js)
io.sails.url = 'http://localhost:1337';

let rootElement = document.getElementById('root');
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(<div className="sch-r">
            <header className="sch-b_header">
                <div className="sch-b_logo">
                  <Link className="sch-b_logo--link" to="/" activeStyle={{ color: '#FFF' }} />
                </div>
              <div className="sch-b_menu">

              </div>
              <div className="sch-b_auth-block">
                <div className="sch-e_login-link">
                  <Link to="/login" activeStyle={{ color: '#FFF' }}>Login</Link>
                  <Link to="/signup" activeStyle={{ color: '#FFF' }}>Sign up</Link>
                </div>
              </div>
            </header>
            <main className="sch-b_main">
              {this.props.children}
            </main>
            <footer className="sch-b_footer">
              <div className="sch-b_footer-copylefts"></div>
            </footer>
    </div>)
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="/about" component={About}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
    </Route>
  </Router>
), rootElement);
