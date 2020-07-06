import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./Components/Common/Header/Header";
import LoginPage from "./Components/LoginPage/LoginPage";
import AdminLogin from "./Components/Admin/AdminLogin";
import Admin from "./Components/Admin/Admin";
import TimePage from "./Components/TimePage/TimePage";
import AddEmployee from "./Components/Employee/AddEmployee";
import Forgot from "./Components/LoginPage/ForgotPassword";

import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Header />
        <div className="content">
          <Switch>
            <Route path="/time-page" component={TimePage} />
            <Route path="/admin-login" component={AdminLogin} />
            <Route path="/admin" component={Admin} />
            <Route path="/add-employee" component={AddEmployee} />
            <Route path="/forgot" component={Forgot} />
            <Route path="/" exact component={LoginPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
