/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import LoginPage from "views/LoginPage/LoginPage.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import LandingProfile from "views/LandingProfile/LandingProfile.js";
import RegisterPage from "views/RegisterPage/RegisterPage.js";

//import { ApolloProvider } from '@apollo/client/react';
import ApolloProvider from "./views/ApolloProvider";

//const client = new ApolloClient({ uri, cache });

const hist = createBrowserHistory();

ReactDOM.render(
  <ApolloProvider>
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/login-page" component={LoginPage} />       
        <Route path="/landing-page" component={LandingPage} />
        <Route path="/profile" component={LandingProfile} />
        <Route path="/register-page" component={RegisterPage} />
        <Redirect to="/login-page" />
      </Switch>{" "}
    </Router>{" "}
  </ApolloProvider>,
  document.getElementById("root")
);
