import React, { Component } from "react";
import { Link } from "react-router-dom";
import noteContext from "../noteContext";
import PropTypes from "prop-types";
import Note from ".././note/note";

class NoteListFiltered extends Component {
  static contextType = noteContext;
  render() {
    // eslint-disable-next-line
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

NoteListFiltered.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object)
};
