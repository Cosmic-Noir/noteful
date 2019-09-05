import React, { Component } from "react";
import Folder from ".././folder/folder";
import noteContext from "../noteContext";
import { Link } from "react-router-dom";
import NotefulError from "../notefulError/notefulError";
import "./folderList.css";

class folderList extends Component {
  static contextType = noteContext;

  render() {
    const folders = this.context.folders.map((folder, i) => (
      <Folder {...folder} key={folder.id} />
    ));
    return (
      <NotefulError>
        <div className="folderList">
          <h2>Folders:</h2>
          <Link to="/">
            <button className="button">All</button>
          </Link>
          {folders}
          <Link to="/addFolder">
            <button className="button">Add Folder</button>
          </Link>
        </div>
      </NotefulError>
    );
  }
}

export default folderList;
