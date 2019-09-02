import React, { Component } from "react";
import Header from "./header/header";
import FolderList from "./folderList/folderList";
// import dummyStore from "./dummy-store";
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
            <Route exact path="/" component={FolderList} />
            <Route exact path="/" component={NoteListMain} />
            <Route path="/folder/:folderID" component={FolderList} />
            <Route path="/folder/:folderID" component={NoteListFiltered} />
            <Route path="/note/:noteID" component={Back} />
            <Route path="/note/:noteID" component={NoteDetails} />
          </noteContext.Provider>
        </div>
      </div>
    );
  }
}

export default App;
