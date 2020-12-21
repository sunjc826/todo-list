import React, { useState, useEffect, createContext, Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import Login from "./login/Login";
import Main from "./Main";
import { fetchIsLoggedIn } from "../redux/actions";

const AppContext = createContext();

function App() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // When we refresh the page, check if the user is logged in
  // and update redux store accordingly
  useEffect(() => {
    dispatch(fetchIsLoggedIn());
  }, []);

  return (
    <Switch>
      <Route path="/login">
        {userState.loggedIn ? <Redirect to="/home" /> : <Login />}
      </Route>
      <Route path="/">
        {userState.loggedIn ? <Main /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  );
}

export default App;
export { AppContext };
