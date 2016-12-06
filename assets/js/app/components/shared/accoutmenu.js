import React, { PropTypes } from "react"
import { Link } from 'react-router'
import { connect } from "react-redux"
import { logOut } from "../../actions"

class AccountMenu extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  handleLogout() {
    const { dispatch } = this.props;
    dispatch(logOut());
  }

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  render() {
    const { auth } = this.props;
    if (auth.isAuthenticated) {
      return (<div className="sch-b_user-menu">
                <div className="user-menu--user-link">
                  <span className="sch-e_pseudo-link" onClick={this.handleLogout}>Logout</span>
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
