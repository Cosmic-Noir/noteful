import React, { Component } from "react";
import noteContext from "../noteContext";
import Note from "../note/note";
import "./noteDetails.css";

class NoteDetails extends Component {
  static contextType = noteContext;

  handleDeleteNote = () => {
    this.props.history.push(`/`);
  };

  render() {
    // eslint-disable-next-line
    const selectedNote = this.context.notes.find(note => {
      if (note.id === this.props.match.params.noteID) {
        return note;
      }
    });

    return (
      <div className="noteDetails">
        <Note
          key={selectedNote.id}
          id={selectedNote.id}
          name={selectedNote.name}
          modified={selectedNote.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <p className="content">{selectedNote.content}</p>
      </div>
    );
  }
}

export default NoteDetails;
