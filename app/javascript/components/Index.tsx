import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import "./app.css";
import App from "./App";
import { getMillisecondsToNextHour } from "../helperFunctions";
import "react-toggle/style.css";

type Collapsible =
  | "projects"
  | "sharedProjects"
  | "tags"
  | "labels"
  | "filters";

const defaultCollapseState = {
  projects: false,
  sharedProjects: false,
  tags: false,
  labels: false,
  filters: false,
};

type TimeContextType = {
  date: Date;
} | null;

type SidebarContextType = {
  sidebarActive: boolean;
  setSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
  collapseOpen: typeof defaultCollapseState;
  toggleCollapse: (item: Collapsible) => () => void;
  resetSidebar: () => void;
} | null;

const TimeContext = createContext<TimeContextType>(null);
const SidebarContext = createContext<SidebarContextType>(null);

const Index = () => {
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

  const [collapseOpen, setCollapseOpen] = useState(defaultCollapseState);
  const toggleCollapse = (item: Collapsible) => () =>
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
};

export default Index;
export { TimeContext, SidebarContext, TimeContextType, SidebarContextType };
