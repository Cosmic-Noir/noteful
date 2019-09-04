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
import AddFolder from "./addFolder/addFolder";
import "./App.css";

class App extends Component {
  state = {
    folders: [],
    notes: [],
    error: null
  };

  setFolders = folders => {
    this.setState({
      folders: folders,
      error: null
    });
  };

  setNotes = notes => {
    this.setState({
      notes: notes,
      error: null
    });
  };

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId);
    this.setState({
      notes: newNotes
    });
  };

  getFolders = () => {
    const url = "http://localhost:9090/folders";
    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setFolders)
      .catch(error => this.setState({ error }));
  };

  getNotes = () => {
    const url = "http://localhost:9090/notes";
    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setNotes)
      .catch(error => this.setState({ error }));
  };

  componentDidMount() {
    this.getFolders();
    this.getNotes();
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote
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
            <Route path="/addFolder" component={Back} />
            <Route path="/addFolder" component={AddFolder} />
          </noteContext.Provider>
        </div>
      </div>
    );
  }
}

export default App;
