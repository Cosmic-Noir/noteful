import React, { Component } from "react";
import noteContext from "../noteContext";
import { Link } from "react-router-dom";
import Note from ".././note/note";

class NoteListFiltered extends Component {
  static contextType = noteContext;
  render() {
    const matchingNotes = this.context.notes.map(note => {
      if (note.folderId === this.props.match.params.folderID) {
        return (
          <Note
            key={note.id}
            id={note.id}
            name={note.name}
            modified={note.modified}
          />
        );
      }
    });

    // console.log(matchingNotes);
    // console.log(this.props);

    return (
      <div className="noteListMain">
        <h3 className="noteListMainTitle">Matching Folder Notes:</h3>
        {matchingNotes}
        <Link to="/addNote">
          <button className="addNote">Add Note</button>
        </Link>
      </div>
    );
  }
}

export default NoteListFiltered;
