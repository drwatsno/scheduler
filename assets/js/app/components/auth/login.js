import React, { PropTypes } from "react"
import AccountAction from "../account/accountAction"
import { bindActionCreators } from 'redux';
import {FormField, FormSubmit} from "../controls/controls"
import { connect } from "react-redux"
import { logIn } from "../../actions"

class Login extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
  }

  handleSubmit(event) {
    let self = this;
    const { dispatch } = this.props;
    event.preventDefault();
    dispatch(logIn(self.state.email, self.state.password));
  }

  emailChange(event) {
    let self = this;
    self.setState(Object.assign(self.state, { email: event.target.value }));
  }

  passwordChange(event) {
    let self = this;
    self.setState(Object.assign(self.state, { password: event.target.value }));
  }

  render() {
    return (
      <AccountAction title="Login">
        <form onSubmit={this.handleSubmit} className="sch-b_form" method="POST" action={this.props.action}>
          <FormField onKeyUp={this.emailChange} value={this.state.email} label="E-mail" name="email" type="text" id="email" />
          <FormField onKeyUp={this.passwordChange} value={this.state.password} label="Password" name="password" type="password" id="password" />
          <FormSubmit submitValue={this.props.submitValue}/>
        </form>
      </AccountAction>)
  }
}

export default connect(state => ({
  auth: state.auth
}))(Login);
