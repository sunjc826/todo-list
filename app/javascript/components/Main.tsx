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
// import Footer from "./footer/Footer";

import Sidebar from "./sidebar/Sidebar";
import Home from "./main/Home";
import Tasks from "./main/task/Tasks";
import Project from "./main/project/Project";
import Support from "./main/Support";
import { Alert } from "reactstrap";
import { SidebarContext } from "./Index";
import { RootState } from "../redux/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { BootstrapColor } from "../redux/shared";
import Statistics from "./main/Statistics";
import Users from "./main/Users";
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: stretch;
`;

type AlertContextType = {
  toggleAlert: ({
    message,
    color,
  }: {
    message: string;
    color: BootstrapColor;
  }) => void;
} | null;
const AlertContext = createContext<AlertContextType>(null);

const Main = () => {
  // global alert
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("info");
  const toggleAlert = ({
    message,
    color,
  }: {
    message: string;
    color: BootstrapColor;
  }) => {
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

  const userState = useSelector((state: RootState) => state.user);
  const taskState = useSelector((state: RootState) => state.task);
  const projectState = useSelector((state: RootState) => state.project);
  const tagState = useSelector((state: RootState) => state.tag);
  const labelState = useSelector((state: RootState) => state.label);
  const filterState = useSelector((state: RootState) => state.filter);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const userId = userState.userId;
  const [doneEffect, setDoneEffect] = useState(false);

  useEffect(() => {
    dispatch(fetchUserData(userId)).then(() => setDoneEffect(true));
  }, []);

  const { url } = useRouteMatch();
  const { sidebarActive } = useContext(SidebarContext)!;
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
                  <Project userState={userState} />
                </Route>
                <Route path={url + "support"}>
                  <Support />
                </Route>
                <Route exact path={url + "statistics"}>
                  <Statistics taskState={taskState} />
                </Route>
                <Route path={url + "home"}>
                  <Home userState={userState} />
                </Route>
                <Route path={url + "users"}>
                  <Users />
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
