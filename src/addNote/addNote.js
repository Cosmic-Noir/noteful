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
      title: {
        value: "",
        touched: false
      },
      content: {
        value: "",
        touched: false
      },
      folder_id: {
        value: "",
        touched: false
      }
    };

    this.title = React.createRef();
    this.content = React.createRef();
    this.folder_id = React.createRef();
  }

  updateTitle(title) {
    this.setState({ title: { value: title, touched: true } });
  }

  updateContent(content) {
    this.setState({ content: { value: content, touched: true } });
  }

  updateFolder(folder_id) {
    this.setState({ folder_id: { value: folder_id, touched: true } });
  }

  static defaultProps = {
    getNotes: () => {}
  };

  static contextType = noteContext;

  // handleSubmit(event) {
  //   event.preventDefault();
  //   const noteTitle = this.state.noteTitle.value;
  //   const noteFolder = this.state.noteFolder.value;
  //   const noteContent = this.state.noteContent.value;
  //   let time = new Date();
  //   time = time.toGMTString();

  //   this.postNote(noteTitle, noteFolder, noteContent, time);
  //   this.props.history.push("/");
  // }

  // postNote = (title, folder, content, time) => {
  //   const url = config.API_ENDPOINT + "notes";
  //   let note = {
  //     title: title,
  //     folder_id: folder,
  //     content: content,
  //     date_published: time
  //   };
  //   fetch(url, {
  //     method: "post",
  //     headers: {
  //       "content-type": "application/json"
  //     },
  //     body: JSON.stringify(note)
  //   })
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error(res.status);
  //       }
  //       return res.json();
  //     })
  //     .then(() => {
  //       this.context.getNotes();
  //     })
  //     // .then(console.log("Request succesful!"))
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  handleSubmit = e => {
    e.preventDefault();

    const { title, folder_id, content } = e.target;
    const note = {
      title: title.value,
      folder_id: folder_id.value,
      content: content.value
    };
    console.log(note);

    this.setState({ error: null });
    fetch(config.API_ENDPOINT + "notes", {
      method: "POST",
      body: JSON.stringify(note),
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
      .then(data => {
        title.value = "";
        folder_id.value = "";
        content.value = "";
        this.context.getNotes(data);
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  validateTitle = () => {
    const title = this.state.title.value.trim();
    if (title.length === 0) {
      return "Title is required.";
    }
  };

  validateContent = () => {
    const content = this.state.content.value.trim();
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
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          className="noteTitle__input"
          name="title"
          id="title"
          ref={this.title}
          onChange={e => this.updateTitle(e.target.value)}
          area-required="true"
          aria-describedby="addNote"
          aria-label="Enter note title"
        ></input>
        {this.state.title.touched && (
          <ValidationError message={this.validateTitle()} />
        )}
        <label htmlFor="folder_id">Folder:</label>
        <select
          className="noteFolder__input"
          name="folder_id"
          id="folder_id"
          ref={this.folder_id}
          onChange={e => this.updateFolder(e.target.value)}
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
          ref={this.content}
          onChange={e => this.updateContent(e.target.value)}
          aria-required="true"
          aira-describedby="addContent"
          aria-label="Enter note title"
        ></input>
        {this.state.content.touched && (
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
