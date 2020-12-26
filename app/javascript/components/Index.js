import React, { useState, useEffect, createContext, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import "./app.css";
import { ModalProvider } from "../customComponents";
import App from "./App";

const TimeContext = createContext();
const SidebarContext = createContext();

// inspired by
// https://stackoverflow.com/questions/34430704/update-react-native-view-on-day-change
// is there a better way?
function getMillisecondsToNextHour(time) {
  const secondsInHour = 3600;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const totalSeconds = minutes * 60 + seconds;
  return (secondsInHour - totalSeconds) * 1000;
}

function Index() {
  // global date
  const [date, setDate] = useState(new Date());

  // date updates hourly
  useEffect(() => {
    const millisecondsToNextHour = getMillisecondsToNextHour(date);
    const timeout = setTimeout(() => {
      setDate(new Date());
    }, millisecondsToNextHour);

    return () => {
      clearTimeout(timeout);
    };
  }, [date]);

  // sidebar states
  const [sidebarActive, setSidebarActive] = useState(false);
  const defaultCollapseState = {
    projects: false,
    tags: false,
    labels: false,
    filters: false,
  };
  const [collapseOpen, setCollapseOpen] = useState(defaultCollapseState);
  const toggleCollapse = (item) => () =>
    setCollapseOpen({
      ...collapseOpen,
      [item]: !collapseOpen[item],
    });
  const resetSidebar = () => setCollapseOpen(defaultCollapseState);

  return (
    <Provider store={store}>
      <TimeContext.Provider value={{ date }}>
        <SidebarContext.Provider
          value={{
            sidebarActive,
            setSidebarActive,
            collapseOpen,
            toggleCollapse,
            resetSidebar,
          }}
        >
          <Router>
            <App />
          </Router>
        </SidebarContext.Provider>
      </TimeContext.Provider>
    </Provider>
  );
}

export default Index;
export { TimeContext, SidebarContext };
