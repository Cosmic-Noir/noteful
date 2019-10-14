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
    const { noteId } = this.props.match.params;

    const { id, title, content, folder_id } = this.state;
    const updatedNote = { id, title, content, folder_id };

    fetch(config.API_ENDPOINT + `notes/${noteId}`, {
      method: "PATCH",
      body: JSON.stringify(updatedNote),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            Promise.reject(error);
          });
        }
      })
      .then(() => {
        // this.context.updateFolders(updatedFolder);
        this.resetFields(updatedNote);
        this.props.history.push("/");
      })
      .catch(error => {
        console.error(error);
        this.setState({ error });
      });
  };

  resetFields = newFields => {
    this.setState({
      id: newFields.id || "",
      title: newFields.title || "",
      content: newFields.content || "",
      folder_name: newFields.folder_name || ""
    });
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  handlChangeTitle = e => {
    this.setState({ title: e.target.value });
  };

  handleChangeContent = e => {
    this.setState({ content: e.target.value });
  };

  handleChangeFolder = e => {
    this.setState({ folder_name: e.target.value });
  };

  componentDidMount() {
    const { noteId } = this.props.match.params;

    fetch(config.API_ENDPOINT + `notes/${noteId}`, {
      method: "Get",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error));
        }
        return res.json();
      })
      .then(res => {
        this.setState({
          id: res.id,
          title: res.title,
          content: res.content,
          folder_name: res.folder_name
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

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
          <select
            className="noteFolder__input"
            name="folder_id"
            id="folder_id"
            value={this.state.folder_name}
            onChange={this.handleChangeFolder}
          >
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
            value={this.state.content}
            onChange={this.handleChangeContent}
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
