import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./home";
import Project from "./project";

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
