import React, { Component } from "react";
import Note from ".././note/note";
import noteContext from "../noteContext";
import "./noteListMain.css";

class NoteListMain extends Component {
  static contextType = noteContext;

  render() {
    const notes = this.context.notes.map(note => (
      <Note
        key={note.id}
        id={note.id}
        name={note.name}
        modified={note.modified}
      />
    ));
    return (
      <div className="noteListMain">
        <h3 className="noteListMainTitle">All Notes:</h3>
        {notes}
        <button className="addNote">Add Note</button>
      </div>
    );
  }
}

export default NoteListMain;
