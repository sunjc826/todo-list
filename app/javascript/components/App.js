import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import "./css/app.css";

import Header from "./header/Header";
import Main from "./Main";
import Footer from "./footer/Footer";

const AppContext = createContext();

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

function App() {
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

  return (
    <Provider store={store}>
      <AppContext.Provider value={{ date }}>
        <Router>
          <Header />
          <Main />
          <Footer />
        </Router>
      </AppContext.Provider>
    </Provider>
  );
}

export default App;
export { AppContext };
