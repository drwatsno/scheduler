import React from "react"

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

export default  AccountAction
