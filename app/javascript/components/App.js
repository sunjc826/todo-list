import React from "react";
import PropTypes from "prop-types";
class App extends React.Component {
  render() {
    return <div>Hello world</div>;
  }
}

App.propTypes = {
  greeting: PropTypes.string,
};
export default App;
