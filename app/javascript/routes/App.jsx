import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";

import StoredProfiles from "../components/StoredProfiles";
import Profiles from "../components/Profiles";


export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/profiles' component={Profiles}/>
          <Route exact path='/profiles/stored' component={StoredProfiles}/>
        </Switch>
      </Router>
    )
  }
}
