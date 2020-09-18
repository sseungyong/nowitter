import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj}></Home>
            </Route>
            <Route expact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser}></Profile>
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth></Auth>
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
