import React from "react"
import AccountAction from "../account/accountAction"
import AccountForm from "../account/accountForm"

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

export default Signup
