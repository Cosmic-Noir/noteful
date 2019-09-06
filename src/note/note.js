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

  handlClickDelete = e => {
    e.preventDefault();
    const noteId = this.props.id;

    fetch(config.API_ENDPOINT + `/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(() => {
        this.props.onDeleteNote();
        this.context.deleteNote(noteId);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { name, modified, id } = this.props;
    return (
      <noteContext.Consumer>
        {context => (
          <NotefulError>
            <div className="note">
              <h4 className="noteTitle">
                <Link to={`/note/${id}`}>{name}</Link>
              </h4>
              <h5 className="modified">{modified}</h5>
              <button
                type="button"
                className="delete"
                onClick={this.handlClickDelete}
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired
};
