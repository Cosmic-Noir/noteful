import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./note.css";

class Note extends Component {
  render() {
    // const note = this.props.find(this.props.id);
    // console.log(note);
    return (
      <div className="note">
        <h4 className="noteTitle">
          <Link to={`/note/${this.props.id}`}>{this.props.name}</Link>
        </h4>
        <h5 className="modified">{this.props.modified}</h5>
        <button className="delete">Delete</button>
      </div>
    );
  }
}

export default Note;
