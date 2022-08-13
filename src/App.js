import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";

import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Profile from "./pages/profile/Profile";
import Members from "./pages/members/list/MembersList";
import MemberDetails from "./pages/members/details/MemberDetails";
import TaskList from "./pages/tasks/list/TaskList";
import Footer from "./pages/footer";
import Header from "./pages/header";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  return (
    <Router history={history}>
      <div>
        <Header />
        <div className="container mt-3">
          <Switch>
            <Route exact path="/dashboard" component={Home} />
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/members" component={Members} />
            <Route path="/member-details" component={MemberDetails} />
            <Route path="/tasks" component={TaskList} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
