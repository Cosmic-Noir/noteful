import React, { Component } from "react";
import "./folder.css";

class Folder extends Component {
  render() {
    return (
      <div className="folder">
        <h3 className="folderName">{this.props.name}</h3>
      </div>
    );
  }
}

export default Folder;
