import React, { Component } from "react";
import Header from "./header/header";
import FolderList from "./folderList/folderList";
import dummyStore from "./dummy-store";
import NoteListMain from "./noteListMain/noteListMain";
import "./App.css";

class App extends Component {
  render() {
    console.log(dummyStore);
    console.log(dummyStore.folders);
    return (
      <div className="App">
        <Header />
        <div className="container">
          <FolderList folders={dummyStore.folders} />
          <NoteListMain notes={dummyStore.notes} />
        </div>
      </div>
    );
  }
}

export default App;
