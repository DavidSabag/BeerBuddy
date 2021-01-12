import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./app/App";
import { configure } from "mobx";
configure({ enforceActions: "never" });

ReactDOM.render(<App />, document.getElementById("root"));
