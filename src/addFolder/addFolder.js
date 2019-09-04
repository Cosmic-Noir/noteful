import React, { Component } from "react";

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.folderName = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form className="addFolder">
        <h2>Add Folder:</h2>
        <label htmlFor="folderName">Folder Name:</label>
        <input
          type="text"
          className="folderName__input"
          name="folderName"
          id="folderName"
          ref={this.folderName}
        ></input>
        <button type="submit" classname="addFolder__button">
          Add
        </button>
      </form>
    );
  }
}

export default AddFolder;
