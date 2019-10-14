import React, { Component } from "react";
import noteContext from "../noteContext";
import PropTypes from "prop-types";
import config from "../config";
import { thisExpression } from "@babel/types";

class EditNote extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object
    }),
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  static contextType = noteContext;

  state = {
    error: null,
    id: "",
    title: "",
    content: "",
    folder_id: ""
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    const folderOptions = this.context.folders.map(folder => {
      return (
        <option key={folder.id} value={folder.id}>
          {folder.folder_name}
        </option>
      );
    });
    return (
      <section className="editNoteForm">
        <h2>Edit Note</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="hidden" name="id" />
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={this.state.title}
            onChange={this.handleChangeTitle}
          />
          <label htmlFor="folder_id">Folder:</label>
          <select className="noteFolder__input" name="folder_id" id="folder_id">
            {folderOptions}
          </select>
          <label htmlFor="content" id="content">
            Add Content:
          </label>
          <input
            type="text"
            className="noteContent__input"
            name="content"
            id="content"
          ></input>
          <button type="button" onClick={this.handleClickCancel}>
            Cancel
          </button>
          <button type="submit">Update Note</button>
        </form>
      </section>
    );
  }
}

export default EditNote;
