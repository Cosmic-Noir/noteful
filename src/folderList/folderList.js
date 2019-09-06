import React, { Component } from "react";
import { Link } from "react-router-dom";
import Folder from ".././folder/folder";
import noteContext from "../noteContext";
import NotefulError from "../notefulError/notefulError";
import PropTypes from "prop-types";
import "./folderList.css";

class FolderList extends Component {
  static contextType = noteContext;

  render() {
    const folders = this.context.folders.map((folder, i) => (
      <Folder {...folder} key={folder.id} />
    ));
    return (
      <NotefulError>
        <div className="FolderList">
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

export default FolderList;

FolderList.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.object)
};
