import React, { Component } from "react";
import Note from ".././note/note";

class NoteListFiltered extends Component {
  render() {
    const matchingNotes = this.props.notes.find();
    return (
      <div className="noteListMain">
        <h3 className="noteListMainTitle">Matching Folder Notes:</h3>
        {matchingNotes}

        <button className="addNote">Add Note</button>
      </div>
    );
  }
}

export default NoteListFiltered;
