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
      .then(data => {
        console.log(noteId);
        this.context.deleteNote(noteId);
        console.log("Delete request sent");
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    // const { title, id } = this.props;
    return (
      <noteContext.Consumer>
        {context => (
          <NotefulError>
            <div className="note">
              <h4 className="noteTitle">
                <Link to={`/notes/${this.props.id}`}>{this.props.title}</Link>
              </h4>
              {/* <h5 className="modified">{modified}</h5> */}
              <button
                type="button"
                className="delete"
                onClick={() => {
                  this.deleteNoteRequest(this.props.id);
                }}
              >
                Delete
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
