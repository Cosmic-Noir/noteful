import React, { Component } from "react";
import Folder from ".././folder/folder";
import noteContext from "../noteContext";
import "./folderList.css";

class folderList extends Component {
  static contextType = noteContext;

  render() {
    const folders = this.context.folders.map((folder, i) => (
      <Folder {...folder} key={folder.id} />
    ));
    return (
      <div className="folderList">
        <h2>Folders:</h2>
        {folders}
        <button className="addFolder">Add Folder</button>
      </div>
    );
  }
}

export default folderList;
