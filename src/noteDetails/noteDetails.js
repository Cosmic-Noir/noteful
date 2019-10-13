import React, { Component } from "react";
import noteContext from "../noteContext";
import Note from "../note/note";
import PropTypes from "prop-types";
import "./noteDetails.css";

class NoteDetails extends Component {
  static contextType = noteContext;

  handleDeleteNote = () => {
    this.props.history.push(`/`);
  };

  render() {
    // eslint-disable-next-line
    console.log(this.context.notes);
    const selectedNote = this.context.notes.find(note => {
      console.log(note.id);
      console.log(this.props.match.params.noteID);
      if (note.id == this.props.match.params.noteID) {
        return note;
      }
    });
    console.log(selectedNote);

    return (
      <div className="noteDetails">
        <Note
          key={selectedNote.id}
          id={selectedNote.id}
          content={selectedNote.content}
          title={selectedNote.title}
          modified={selectedNote.modified}
          folder_id={selectedNote.folder_id}
          onDeleteNote={this.handleDeleteNote}
        />
        <p className="content">{selectedNote.content}</p>
      </div>
    );
  }
}

export default NoteDetails;

NoteDetails.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object)
};
