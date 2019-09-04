import React, { Component } from "react";
import noteContext from "../noteContext";

class AddFolder extends Component {
  static defaultProps = {
    getFolders: () => {}
  };

  static contextType = noteContext;

  constructor(props) {
    super(props);
    this.state = {};
    this.folderName = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    const folderName = this.folderName.current.value;
    console.log(folderName);
    this.postFolder(folderName);
  }

  postFolder(folderName) {
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
  }

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
          ref={this.folderName}
        ></input>
        <button type="submit" className="addFolder__button">
          Add
        </button>
      </form>
    );
  }
}

export default AddFolder;
