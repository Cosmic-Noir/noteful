import React, { Component } from "react";
import "./back.css";

class Back extends Component {
  render() {
    return (
      <div className="back">
        <h2>Folder:</h2>
        <button onClick={() => this.props.history.goBack()}>
          Back to List
        </button>
      </div>
    );
  }
}

export default Back;
