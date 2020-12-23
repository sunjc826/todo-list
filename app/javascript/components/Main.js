import React, { Fragment, useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../redux/actions";
import styled from "styled-components";
import Header from "./header/Header";
import Footer from "./footer/Footer";

import Sidebar from "./sidebar/Sidebar";
import Home from "./main/Home";
import Tasks from "./main/task/Tasks";
import Project from "./main/project/Project";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: stretch;
`;

const Content = styled.div`
  width: 100%;
`;

const Main = () => {
  const userState = useSelector((state) => state.user);
  const taskState = useSelector((state) => state.task);
  const projectState = useSelector((state) => state.project);
  const tagState = useSelector((state) => state.tag);
  const labelState = useSelector((state) => state.label);
  const dispatch = useDispatch();
  const userId = userState.userId;
  const [doneEffect, setDoneEffect] = useState(false);
  useEffect(() => {
    dispatch(fetchUserData(userId)).then((res) => setDoneEffect(true));
  }, []);

  const { url } = useRouteMatch();

  return (
    <Fragment>
      <Header />
      {doneEffect && (
        <Wrapper>
          <Sidebar />
          <Content>
            <Switch>
              <Route exact path={url + "tasks"}>
                <Tasks
                  taskState={taskState}
                  tagState={tagState}
                  labelState={labelState}
                />
              </Route>
              <Route exact path={url + "project/:projectId"}>
                <Project projectState={projectState} taskState={taskState} />
              </Route>
              <Route path={url + "home"}>
                <Home userState={userState} />
              </Route>
            </Switch>
          </Content>
        </Wrapper>
      )}
      <Footer />
    </Fragment>
  );
};

export default Main;

/*
          

*/
