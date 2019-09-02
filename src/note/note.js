import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import noteContext from "../noteContext";
import "./note.css";

class Note extends Component {
  static defaultProps = {
    onDeleteNote: () => {}
  };

  static contextType = noteContext;

  handlClickDelete = e => {
    e.preventDefault();
    const noteId = this.props.id;

    fetch(config.API_ENDPOINT + "/notes/" + `${noteId}`, {
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
        this.context.deleteNote(noteId);
        this.props.onDeleteNote(noteId);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    // const note = this.props.find(this.props.id);
    // console.log(note);
    return (
      <noteContext.Consumer>
        {context => (
          <div className="note">
            <h4 className="noteTitle">
              <Link to={`/note/${this.props.id}`}>{this.props.name}</Link>
            </h4>
            <h5 className="modified">{this.props.modified}</h5>
            <button className="delete" onClick={this.hanldeClickDelete}>
              Delete
            </button>
          </div>
        )}
      </noteContext.Consumer>
    );
  }
}

export default Note;
