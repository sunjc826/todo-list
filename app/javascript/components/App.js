import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./header/Header";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch></Switch>
      </Router>
    );
  }
}

export default App;
