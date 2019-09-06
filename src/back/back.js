import React, { Component } from "react";
import "./back.css";

class Back extends Component {
  render() {
    return (
      <div className="back">
        <button onClick={() => this.props.history.goBack()} className="button">
          Back to List
        </button>
      </div>
    );
  }
}

export default Back;
