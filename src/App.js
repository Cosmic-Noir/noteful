import React, { Component } from "react";
import Header from "./header/header";
import FolderList from "./folderList/folderList";
import dummyStore from "./dummy-store";
import NoteListMain from "./noteListMain/noteListMain";
import { Route, Link } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    console.log(dummyStore);
    console.log(dummyStore.folders);
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Route
            exact
            path="/"
            render={() => <FolderList folders={dummyStore.folders} />}
          />
          <Route
            path="/"
            render={routeProps => (
              <NoteListMain notes={dummyStore.notes} {...routeProps} />
            )}
          />
        </div>
      </div>
    );
  }
}

export default App;
