import React, { Component } from "react";
import noteContext from "../noteContext";
import "./noteDetails.css";

class NoteDetails extends Component {
  static contextType = noteContext;
  render() {
    const selectedNote = this.context.notes.find(note => {
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
