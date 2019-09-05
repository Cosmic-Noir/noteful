import React, { Component } from "react";

class NotefulError extends Component {
  static getDerivedStateFromError = error => {
    return { hasError: true };
  };

  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Apologies, an error has occured! </h2>;
    }
    return this.props.children;
  }
}

export default NotefulError;
