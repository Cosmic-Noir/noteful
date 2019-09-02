import React from "react";

const noteContext = React.createContext({
  folders: [],
  notes: []
});

export default noteContext;
