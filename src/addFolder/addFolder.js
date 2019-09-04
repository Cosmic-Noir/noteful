import React, { Component } from "react";

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.folderName = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    const folderName = this.folderName.current.value;
    console.log(folderName);
  }

  postFolder(folderName) {
    const url = "http://localhost:9090/folders";
    let id = Math.floor(Math.random() * 1000);
    let folder = { id: id, name: folderName };
    fetch(url, {
      method: "post",
      body: JSON.stringify(folder)
    }).then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
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
