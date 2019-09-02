import React from "react";

const noteContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {}
});

export default noteContext;
