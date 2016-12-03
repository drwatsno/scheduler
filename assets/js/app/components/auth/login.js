import React, { PropTypes } from "react"
import AccountAction from "../account/accountAction"
import AccountForm from "../account/accountForm"
import { bindActionCreators } from 'redux';
import { connect } from "react-redux"
import { logIn } from "../../actions"

class Login extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { /*auth , */dispatch } = this.props;
   // console.log(logIn, actions, auth, dispatch);
    event.preventDefault();

    dispatch(logIn("test","test"));

  }

  render() {
    const { /*auth , */dispatch } = this.props;
    //const actions = bindActionCreators(logIn, dispatch);
    return (
      <AccountAction title="Login">
        <AccountForm onSubmit={this.handleSubmit} action="/login" submitValue="Log in" />
      </AccountAction>)
  }
}

export default connect(state => ({
  auth: state.auth
}))(Login);
