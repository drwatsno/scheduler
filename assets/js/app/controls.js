import React from 'react'

class FormField extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div className="form-field">
               <label htmlFor={this.props.name}>{this.props.label}</label>
               <input className={"sch-e_input-"+this.props.type || "text"} type={this.props.type || "text"} id={this.props.id} name={this.props.name} />
            </div>)
  }
}

class FormSubmit extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div className="form-actions">
              <input className="sch-e_green-button" type="submit" value={this.props.submitValue || "Submit"} />
            </div>)
  }
}

export {FormField, FormSubmit}
