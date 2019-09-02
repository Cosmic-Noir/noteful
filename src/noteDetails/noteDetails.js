import React, { Component } from "react";
import "./noteDetails.css";

class NoteDetails extends Component {
  render() {
    const selectedNote = this.props.notes.find(note => {
      if (note.id === this.props.match.params.noteID) {
        return note;
      }
    });

    // console.log(selectedNote);
    return (
      <div className="noteDetails">
        <h3 className="noteTitle">{selectedNote.name}</h3>
        <h5 className="modified">{selectedNote.modified}</h5>
        <p className="content">{selectedNote.content}</p>
        <button>Delete</button>
      </div>
    );
  }
}

export default NoteDetails;
