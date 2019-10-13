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
    const selectedNote = this.context.notes.find(note => {
      if (note.id == this.props.match.params.noteID) {
        return note;
      }
    });

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
