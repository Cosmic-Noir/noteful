import React, { Component } from "react";
import PropTypes from "prop-types";
import "./back.css";

class Back extends Component {
  render() {
    return (
      <div className="back">
        <button onClick={() => this.props.history.goBack()}>
          Back to List
        </button>
      </div>
    );
  }
}

export default Back;

Back.propTypes = {
  history: PropTypes.object.isRequired
};
