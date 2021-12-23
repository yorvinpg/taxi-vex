import React from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}Home`} component={asyncComponent(() => import('./Home'))} />
      <Route path={`${match.url}BaseDatos`} component={asyncComponent(() => import('./BaseDatos'))} />
    </Switch>
  </div>
);

export default App;
