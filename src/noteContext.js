import React from "react";

const noteContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  getFolders: () => {},
  getNotes: () => {}
});

export default noteContext;
