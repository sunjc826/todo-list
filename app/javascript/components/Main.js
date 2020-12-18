import React, { Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUserData, fetchTagsData } from "../redux/actions";
import styled from "styled-components";
import Sidebar from "./sidebar/Sidebar";
import Home from "./main/Home";
import Tasks from "./main/Tasks";
import Projects from "./main/Projects";

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
  useEffect(() => {
    // console.log("fetching data");
    fetchUserData();
    fetchTagsData();
  }, []);

  return (
    <Fragment>
      <Wrapper>
        <Sidebar />
        <Content>
          <Switch>
            <Route exact path="/tasks">
              <Tasks />
            </Route>
            <Route exact path="/projects">
              <Projects />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Content>
      </Wrapper>
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
  fetchUserData: () => dispatch(fetchUserData()),
  fetchTagsData: () => dispatch(fetchTagsData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
