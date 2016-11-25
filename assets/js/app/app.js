import React from 'react'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { render } from 'react-dom'
import Index from './index'
import About from './about'
import Login from './login'

let rootElement = document.getElementById('root');
//const io = require("../modules/sails.io")(require("../modules/socket.io"));

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
    </Route>
  </Router>
), document.getElementById("root"));
