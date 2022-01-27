import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const Configuraciones = ({ match }) => (
    <div className="gx-main-content-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/Registro`} />
            <Route path={`${match.url}/Registro`} component={asyncComponent(() => import('./Registro'))} />
        </Switch>
    </div>
);

export default Configuraciones;
