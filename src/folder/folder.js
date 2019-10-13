import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./folder.css";

class Folder extends Component {
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
