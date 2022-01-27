import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const Pago = ({ match }) => (
    <div className="gx-main-content-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/Registros`} />
            <Route path={`${match.url}/Registros`} component={asyncComponent(() => import('./Registros'))} />
        </Switch>
    </div>
);

export default Pago;
