import React, { PropTypes } from "react"
import AccountAction from "../account/accountAction"
import ErrorContainer from "../shared/errorcontainer"
import {FormField, FormSubmit} from "../controls/controls"
import { connect } from "react-redux"
import { signUp } from "../../actions"

class Signup extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    let formData = new FormData(event.target);
    dispatch(signUp(formData.get("email"), formData.get("password")));
  }

  render() {
    const { auth } = this.props;
    return (
      <AccountAction title="Signup">
        <form onSubmit={this.handleSubmit} className="sch-b_form" method="POST" action={this.props.action}>
          <FormField label="E-mail" name="email" type="text" id="email" />
          <FormField label="Password" name="password" type="password" id="password" />
          <FormSubmit submitValue={this.props.submitValue}/>
        </form>
        <ErrorContainer message={auth.authActionError} />
      </AccountAction>)
  }
}

export default connect(state => ({
  auth: state.auth
}))(Signup);
