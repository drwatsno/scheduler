import React from "react"

class ErrorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      style: {
        display: "none"
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    let self = this;

    if (nextProps.message != self.props.message) {
      self.setState({
        message: nextProps.message,
        style: {
          display: "block"
        }
      });

      setTimeout(function () {
        self.setState({
          message: "",
          style: {
            display: "none"
          }
        });
      }, 3000)
    }
  }

  render() {
    return (<div style={this.state.style} className="sch-b_error-container">
      {this.state.message}
    </div>)
  }
}

export default ErrorContainer
