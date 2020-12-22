import React, { Fragment, useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUserData, fetchTagsData } from "../redux/actions";
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

const Main = ({
  labelState,
  projectState,
  subtaskState,
  tagState,
  taskState,
  userState,
  fetchUserData,
  fetchTagsData,
}) => {
  const userId = userState.userId;
  // console.log("USERSTATE");
  // console.log(userState);
  // console.log(userId);

  const [doneEffect, setDoneEffect] = useState(false);
  useEffect(() => {
    setDoneEffect(true);
    fetchUserData(userId);
    fetchTagsData();
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
                <Tasks taskState={taskState} />
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

const mapStateToProps = (state) => ({
  labelState: state.label,
  projectState: state.project,
  subtaskState: state.subtask,
  tagState: state.tag,
  taskState: state.task,
  userState: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserData: (userId) => dispatch(fetchUserData(userId)),
  fetchTagsData: () => dispatch(fetchTagsData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
