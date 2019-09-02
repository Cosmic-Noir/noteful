import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./folder.css";

class Folder extends Component {
  render() {
    return (
      <div className="folder">
        <NavLink to={`/folder/${this.props.id}`}>{this.props.name}</NavLink>
      </div>
    );
  }
}

export default Folder;
