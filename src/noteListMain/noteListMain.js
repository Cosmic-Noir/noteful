import React, { Component } from "react";
import Note from ".././note/note";
import "./noteListMain.css";

class NoteListMain extends Component {
  render() {
    const notes = this.props.notes.map(note => (
      <Note
        key={note.id}
        id={note.id}
        name={note.name}
        modified={note.modified}
      />
    ));
    console.log(notes);
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
