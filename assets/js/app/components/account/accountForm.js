import React from "react"
import {FormField, FormSubmit} from "../controls/controls"

class AccountForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<form onSubmit={this.props.onSubmit} className="sch-b_form" method="POST" action={this.props.action}>
              <FormField label="E-mail" name="email" type="text" id="email" />
              <FormField label="Password" name="password" type="password" id="password" />
              <FormSubmit submitValue={this.props.submitValue}/>
            </form>)
  }
}

export default AccountForm
