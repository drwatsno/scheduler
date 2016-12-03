import React from 'react'
import {  Link } from 'react-router'
import { render } from 'react-dom'

class Root extends React.Component {
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

export default Root;
