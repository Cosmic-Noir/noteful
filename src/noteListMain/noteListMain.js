import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotefulError from "../notefulError/notefulError";
import noteContext from "../noteContext";
import Note from ".././note/note";
import PropTypes from "prop-types";
import "./noteListMain.css";

class NoteListMain extends Component {
  static contextType = noteContext;

  render() {
    const notes = this.context.notes.map(note => (
      <Note
        key={note.id}
        id={note.id}
        title={note.title}
        folder_id={note.folder_id}
      />
    ));
    return (
      <div className="noteListMain">
        <NotefulError>
          <h3 className="noteListMainTitle">All Notes:</h3>
          {notes}
          <Link to="/addNote">
            <button className="addNote">Add Note</button>
          </Link>
        </NotefulError>
      </div>
    );
  }
}

export default NoteListMain;

NoteListMain.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object)
};
