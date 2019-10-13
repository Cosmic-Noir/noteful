import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import noteContext from "../noteContext";
import NotefulError from "../notefulError/notefulError";
import PropTypes from "prop-types";

import "./note.css";

class Note extends Component {
  static defaultProps = {
    onDeleteNote: () => {},
    deleteNote: () => {}
  };

  static contextType = noteContext;

  deleteNoteRequest = noteId => {
    console.log(config.API_ENDPOINT + `notes/${noteId}`);
    fetch(config.API_ENDPOINT + `notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "applicaiton/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error));
        }
      })
      .then(() => {
        console.log(noteId);
        this.context.deleteNote(noteId);
        this.props.history.push("/");
        // Need access to history, or to function that has access to history
        console.log("Delete request sent");
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <noteContext.Consumer>
        {context => (
          <NotefulError>
            <div className="note">
              <h4 className="noteTitle">
                <Link to={`/notes/${this.props.id}`}>{this.props.title}</Link>
              </h4>
              <button
                type="button"
                className="delete"
                onClick={() => {
                  this.deleteNoteRequest(this.props.id);
                }}
              >
                <Link to={`/`}>Delete</Link>
              </button>
            </div>
          </NotefulError>
        )}
      </noteContext.Consumer>
    );
  }
}

export default Note;

Note.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  // modified: PropTypes.string.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired
};
