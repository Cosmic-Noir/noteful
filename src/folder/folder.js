import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import noteContext from "../noteContext";
import config from "../config";
import "./folder.css";

class Folder extends Component {
  static defaultProps = {
    getFolders: () => {}
  };

  static contextType = noteContext;

  deleteFolderRequest = folderId => {
    fetch(config.API_ENDPOINT + `folders/${folderId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error));
        }
      })
      .then(() => {
        this.context.getFolders();
        this.context.getNotes();
        // console.log(`Delete request sent for Folder Id ${folderId}`);
      });
  };

  render() {
    return (
      <div className="folder">
        <NavLink to={`/folder/${this.props.id}`}>
          {this.props.folder_name}
        </NavLink>
        <button
          type="button"
          id="folderDelete"
          onClick={() => {
            this.deleteFolderRequest(this.props.id);
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default Folder;

Folder.propTypes = {
  folder_name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};
