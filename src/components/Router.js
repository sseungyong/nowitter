import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      {isLoggedIn ? (
        <>
          <div className="router">
            <Route exact path="/">
              <Home userObj={userObj}></Home>
            </Route>
            <Route expact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser}></Profile>
            </Route>
          </div>
        </>
      ) : (
        <Route exact path="/">
          <Auth></Auth>
        </Route>
      )}
    </Router>
  );
};

export default AppRouter;
