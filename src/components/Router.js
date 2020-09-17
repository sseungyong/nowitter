import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route expact path="/">
              <Home></Home>
            </Route>
            <Route expact path="/profile">
              <Profile></Profile>
            </Route>
            {/* <Redirect from="*" to="/"/> */}
          </>
        ) : (
          <Route exact path="/">
            <Auth></Auth>
          </Route>
          // <Redirect from="*" to="/"/>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
