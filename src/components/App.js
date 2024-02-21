import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Project from "./project";

/**
 * 
 * Main Component of the application.
 */
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/projects/:projectId" component={Project} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>    
  );
};

export default App;
