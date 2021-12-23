import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const BaseDatos = ({ match }) => (
    <div className="gx-main-content-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/Usuarios`} />
            <Route path={`${match.url}/Usuarios`} component={asyncComponent(() => import('./Usuarios'))} />
            <Route path={`${match.url}/Conductores`} component={asyncComponent(() => import('./Conductores'))} />
        </Switch>
    </div>
);

export default BaseDatos;
