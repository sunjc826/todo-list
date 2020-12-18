import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import "./css/app.css";

import Header from "./header/Header";
import Main from "./Main";
import Footer from "./footer/Footer";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Main />
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
