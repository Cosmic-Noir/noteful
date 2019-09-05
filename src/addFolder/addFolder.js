import React, { Component } from "react";
import ValidationError from "../validationError";
import noteContext from "../noteContext";

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: {
        value: "",
        touched: false
      }
    };
    this.folderName = React.createRef();
  }

  static defaultProps = {
    getFolders: () => {}
  };

  static contextType = noteContext;

  updateFolder = folderName => {
    this.setState({ folderName: { value: folderName, touched: true } });
  };

  validateFolder = () => {
    const folder = this.state.folderName.value.trim();
    if (folder.length === 0) {
      return "Title is required.";
    }
  };

  handleSubmit(event) {
    event.preventDefault();
    const folderName = this.state.folderName.value;
    console.log(folderName);
    if (this.state.folderName.value !== "") {
      this.postFolder(folderName);
      this.props.history.push("/");
    }
  }

  postFolder = folderName => {
    const url = "http://localhost:9090/folders";
    let folder = { name: folderName };
    fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(folder)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(() => {
        this.context.getFolders();
      })
      .then(console.log("Request succesful!"))
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <form className="addFolder" onSubmit={e => this.handleSubmit(e)}>
        <h2>Add Folder:</h2>
        <label htmlFor="folderName">Folder Name:</label>
        <input
          type="text"
          className="folderName__input"
          name="folderName"
          id="folderName"
          // ref={this.folderName}
          onChange={e => this.updateFolder(e.target.value)}
        ></input>
        {this.state.folderName.touched && (
          <ValidationError message={this.validateFolder()} />
        )}

        <button type="submit" className="addFolder__button">
          Add
        </button>
      </form>
    );
  }
}

export default AddFolder;
