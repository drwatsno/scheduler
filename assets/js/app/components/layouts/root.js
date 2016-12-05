import React from 'react'
import { Link } from 'react-router'
import AccountMenu from '../shared/accoutmenu'

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
        <div className="sch-b_menu"></div>
        <AccountMenu />
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
