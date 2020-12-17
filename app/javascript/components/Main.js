import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Tasks from "./main/Tasks";

const Main = () => {
  return (
    <Fragment>
      <Sidebar />
      <Switch>
        <Route>
          <Tasks />
        </Route>
        <Route>
          <Projects />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default Main;
