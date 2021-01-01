import React, {
  Fragment,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
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
import Support from "./main/Support";
import { Alert } from "reactstrap";
import { SidebarContext } from "./Index";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: stretch;
`;

const AlertContext = createContext();

const Main = () => {
  // global alert
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("info");
  const toggleAlert = ({ message, color }) => {
    color = color || "info";
    setAlertMessage(message);
    setAlertColor(color);
    setAlertVisible(true);
  };
  const onDismiss = () => setAlertVisible(false);
  useEffect(() => {
    if (alertVisible) {
      const timeout = setTimeout(() => {
        setAlertVisible(false);
        setAlertColor("info");
        setAlertMessage("");
      }, 5000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [alertVisible]);

  const userState = useSelector((state) => state.user);
  const taskState = useSelector((state) => state.task);
  const projectState = useSelector((state) => state.project);
  const tagState = useSelector((state) => state.tag);
  const labelState = useSelector((state) => state.label);
  const filterState = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const userId = userState.userId;
  const [doneEffect, setDoneEffect] = useState(false);
  useEffect(() => {
    dispatch(fetchUserData(userId)).then((res) => setDoneEffect(true));
  }, []);

  const { url } = useRouteMatch();
  const { sidebarActive } = useContext(SidebarContext);
  return (
    <Fragment>
      <AlertContext.Provider value={{ toggleAlert }}>
        <Header />
        {doneEffect && (
          <Wrapper>
            <Sidebar />
            <div
              id="main-content"
              className={`${sidebarActive ? "active" : ""}`}
            >
              <Alert
                color={alertColor}
                isOpen={alertVisible}
                toggle={onDismiss}
              >
                {alertMessage}
              </Alert>
              <Switch>
                <Route exact path={url + "tasks"}>
                  <Tasks
                    taskState={taskState}
                    tagState={tagState}
                    labelState={labelState}
                    filterState={filterState}
                  />
                </Route>
                <Route exact path={url + "project/:projectId"}>
                  <Project projectState={projectState} taskState={taskState} />
                </Route>
                <Route exact path={url + "support"}>
                  <Support />
                </Route>
                <Route path={url + "home"}>
                  <Home userState={userState} />
                </Route>
              </Switch>
            </div>
          </Wrapper>
        )}
      </AlertContext.Provider>
    </Fragment>
  );
};

export default Main;
export { AlertContext };
