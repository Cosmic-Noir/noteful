import React, { Component } from "react";
import Header from "./header/header";
import FolderList from "./folderList/folderList";
import dummyStore from "./dummy-store";
import NoteListMain from "./noteListMain/noteListMain";
import { Route } from "react-router-dom";
import NoteListFiltered from "./noteListFiltered/noteListFiltered";
import NoteDetails from "./noteDetails/noteDetails";
import Back from "./back/back";
import noteContext from "./noteContext";
import "./App.css";

class App extends Component {
  state = {
    folders: [],
    notes: []
  };

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes
    };
    // console.log(dummyStore);
    // console.log(dummyStore.folders);
    return (
      <div className="App">
        <Header />
        <div className="container">
          <noteContext.Provider value={contextValue}>
            <Route
              exact
              path="/"
              render={routeProps => (
                <FolderList folders={dummyStore.folders} {...routeProps} />
              )}
            />
            <Route
              exact
              path="/"
              render={routeProps => (
                <NoteListMain notes={dummyStore.notes} {...routeProps} />
              )}
            />
            <Route
              path="/folder/:folderID"
              render={routeProps => (
                <FolderList folders={dummyStore.folders} {...routeProps} />
              )}
            />
            <Route
              path="/folder/:folderID"
              render={routeProps => (
                <NoteListFiltered notes={dummyStore.notes} {...routeProps} />
              )}
            />
            <Route
              path="/note/:noteID"
              render={routeProps => (
                <Back
                  {...routeProps}
                  notes={dummyStore.notes}
                  folders={dummyStore.notes}
                />
              )}
            />
            <Route
              path="/note/:noteID"
              render={routeProps => (
                <NoteDetails notes={dummyStore.notes} {...routeProps} />
              )}
            />
          </noteContext.Provider>
        </div>
      </div>
    );
  }
}

export default App;
