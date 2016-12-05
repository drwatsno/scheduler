import React, { PropTypes } from "react"
import { Link } from 'react-router'
import { connect } from "react-redux"


class AccountMenu extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
  }

  render() {
    const { auth } = this.props;

    if (auth.isAuthenticated) {
      return (<div className="sch-b_user-menu">
                <div className="user-menu--user-link">
                  <Link to="/logout" activeStyle={{ color: '#FFF' }}>Logout</Link>
                </div>
                <div className="user-menu--user-link">
                  <Link to="/user" activeStyle={{ color: '#FFF' }}>{auth.user.name}</Link>
                </div>
              </div>)
    } else
      return (<div className="sch-b_auth-block">
              <div className="sch-e_login-link">
                <Link to="/login" activeStyle={{ color: '#FFF' }}>Login</Link>
                <Link to="/signup" activeStyle={{ color: '#FFF' }}>Sign up</Link>
              </div>
            </div>)
  }
}

export default connect(state => ({
  auth: state.auth
}))(AccountMenu);
