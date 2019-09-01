import React, { Component } from "react";
import Note from ".././note/note";
import "./noteListMain.css";

class NoteListMain extends Component {
  render() {
    const notes = this.props.notes.map((note, i) => <Note {...note} key={i} />);
    return (
      <div className="noteListMain">
        <h3 className="noteListMainTitle">All Notes:</h3>
        {notes}
      </div>
    );
  }
}

export default NoteListMain;
