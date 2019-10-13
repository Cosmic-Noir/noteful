import React, { Component } from "react";
import noteContext from "../noteContext";
import ValidationError from "../validationError";
import "./addNote.css";
import PropTypes from "prop-types";
import config from "../config";

class AddNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noteTitle: {
        value: "",
        touched: false
      },
      noteContent: {
        value: "",
        touched: false
      },
      noteFolder: {
        value: "",
        touched: false
      }
    };

    this.noteTitle = React.createRef();
    this.noteContent = React.createRef();
    this.noteFolder = React.createRef();
  }

  updateTitle(noteTitle) {
    this.setState({ noteTitle: { value: noteTitle, touched: true } });
  }

  updateContent(noteContent) {
    this.setState({ noteContent: { value: noteContent, touched: true } });
  }

  updateFolder(noteFolder) {
    this.setState({ noteFolder: { value: noteFolder, touched: true } });
  }

  static defaultProps = {
    getNotes: () => {}
  };

  static contextType = noteContext;

  handleSubmit(event) {
    event.preventDefault();
    const noteTitle = this.state.noteTitle.value;
    const noteFolder = this.state.noteFolder.value;
    const noteContent = this.state.noteContent.value;
    let time = new Date();
    time = time.toGMTString();

    this.postNote(noteTitle, noteFolder, noteContent, time);
    this.props.history.push("/");
  }

  postNote = (title, folder, content, time) => {
    const url = config.API_ENDPOINT + "notes";
    let note = {
      title: title,
      folder_id: folder,
      content: content,
      date_published: time
    };
    fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(note)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(() => {
        this.context.getNotes();
      })
      // .then(console.log("Request succesful!"))
      .catch(error => {
        console.log(error);
      });
  };

  validateTitle = () => {
    const title = this.state.noteTitle.value.trim();
    if (title.length === 0) {
      return "Title is required.";
    }
  };

  validateContent = () => {
    const content = this.state.noteContent.value.trim();
    if (content.length === 0) {
      return "Content is required.";
    }
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
      <form
        onSubmit={e => {
          this.handleSubmit(e);
        }}
      >
        <h2>Add Note:</h2>
        <label htmlFor="noteTitle">Title:</label>
        <input
          type="text"
          className="noteTitle__input"
          name="noteTitle"
          id="noteTitle"
          ref={this.noteTitle}
          onChange={e => this.updateTitle(e.target.value)}
          area-required="true"
          aria-describedby="addNote"
          aria-label="Enter note title"
        ></input>
        {this.state.noteTitle.touched && (
          <ValidationError message={this.validateTitle()} />
        )}
        <label htmlFor="noteFolder">Folder:</label>
        <select
          className="noteFolder__input"
          name="noteFolder"
          id="noteFolder"
          //   ref={this.noteFolder}
          onChange={e => this.updateFolder(e.target.value)}
        >
          {folderOptions}
        </select>
        <label htmlFor="noteContent" id="addContent">
          Add Content:
        </label>
        <input
          type="text"
          className="noteContent__input"
          name="noteContent"
          id="noteContent"
          ref={this.noteContent}
          onChange={e => this.updateContent(e.target.value)}
          aria-required="true"
          aira-describedby="addContent"
          aria-label="Enter note title"
        ></input>
        {this.state.noteContent.touched && (
          <ValidationError message={this.validateContent()} />
        )}
        <button
          id="addNote"
          type="submit"
          disabled={this.validateTitle() || this.validateContent()}
        >
          Add Note
        </button>
      </form>
    );
  }
}

export default AddNote;

AddNote.propTypes = {
  getNotes: PropTypes.func.isRequired
};
