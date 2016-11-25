import React from 'react'
import {FormField, FormSubmit} from './controls'

class AccountAction extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div className="sch-b_content-centered">
              <div className="sch-b_account-actions-form">
                <h1 className="sch-e_block-header">{this.props.title}</h1>
                {this.props.children}
              </div>
          </div>)
  }
}

class AccountForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<form className="sch-b_form" method="POST" action={this.props.action}>
              <FormField label="E-mail" name="email" type="text" id="email" />
              <FormField label="Password" name="password" type="password" id="password" />
              <FormSubmit submitValue={this.props.submitValue}/>
            </form>)
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AccountAction title="Login">
        <AccountForm action="/login" submitValue="Log in" />
      </AccountAction>)
  }
}
class Signup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AccountAction title="Signup">
        <AccountForm action="/signup" submitValue="Sign Up" />
      </AccountAction>)
  }
}

export {Login, Signup}
