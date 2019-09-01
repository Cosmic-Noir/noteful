import React, { Component } from "react";
import Folder from ".././folder/folder";
import "./folderList.css";

class folderList extends Component {
  render() {
    const folders = this.props.folders.map((folder, i) => (
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
