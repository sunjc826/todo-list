import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import Login from "./login/Login";
import Main from "./Main";
import { fetchIsLoggedIn } from "../redux/actions";

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
