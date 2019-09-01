import React, { Component } from "react";
import "./note.css";

class Note extends Component {
  render() {
    return (
      <div className="note">
        <h4 className="noteTitle">{this.props.name}</h4>
        <h5 className="modified">{this.props.modified}</h5>
        <button className="delete">Delete</button>
      </div>
    );
  }
}

export default Note;
