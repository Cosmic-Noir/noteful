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
      const numberProp = parseInt(this.props.match.params.folderID);
      // console.log(typeof numberProp);
      if (note.folder_id === numberProp) {
        return (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            folder_id={note.folder_id}
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
