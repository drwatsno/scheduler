import React from 'react'

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sch-b_content-centered">
      <div className="sch-b_account-actions-form">
        <h1 className="sch-e_block-header">Login</h1>
        <form className="sch-b_form" method="POST" action="/login">
            <div className="form-field">
              <label htmlFor="email">E-mail</label>
              <input className="sch-e_input-text" id="email" type="text" name="email" />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input className="sch-e_input-text" id="password" type="password" name="password" />
            </div>
            <div className="form-actions">
              <input className="sch-e_green-button" type="submit" value="signup" />
            </div>
        </form>
      </div>
    </div>)
  }
}

export default Login;
