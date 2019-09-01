import React, { Component } from "react";
import Note from ".././note/note";

class NoteListFiltered extends Component {
  render() {
    const matchingNotes = this.props.notes.map(note => {
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

    console.log(matchingNotes);
    console.log(this.props);

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
