import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./Components/Common/Header/Header";
import LoginPage from "./Components/LoginPage/LoginPage";
import AdminLogin from "./Components/Admin/AdminLogin";
import Admin from "./Components/Admin/Admin";
import TimePage from "./Components/TimePage/TimePage";
import AddEmployee from "./Components/Employee/AddEmployee";
import Forgot from "./Components/LoginPage/ForgotPassword";
import EnterMobile from "./Components/LoginPage/EnterNumber";
import ViewEmployees from "./Components/Employee/ViewEmployees";
import EditEmployee from "./Components/Employee/EditEmployee";
import ViewEmployee from "./Components/Employee/ViewEmployee";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

class App extends Component {
  state = {
    isLoggedIn: false,
    isAdmin: false,
  };

  componentDidMount() {
    const expiryDate = localStorage.getItem("expiryDate");

    if (!expiryDate) {
      this.setState({ isLoggedIn: false });
    }

    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
    }
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setAutoLogout(remainingMilliseconds);
  }

  loginHandler = () => {
    this.setState({ isLoggedIn: true });
    localStorage.setItem("isLoggedIn", true);
  };

  logoutHandler = () => {
    this.setState({ isLoggedIn: false });
    localStorage.setItem("isLoggedIn", false);
    return <Redirect to="/" />;
  };

  setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  adminLoginToggler = () => {
    this.setState({ isAdmin: !this.state.isAdmin });
  };

  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Header />
        <div className="content">
          <Switch>
            <Route path="/admin-login" component={AdminLogin} />

            <Route
              path="/admin"
              render={(props) => (
                <Admin
                  isAdmin={this.state.isAdmin}
                  adminLoginToggler={this.adminLoginToggler}
                  {...props}
                />
              )}
            />
            <Route path="/admin" component={Admin} />
            <Route path="/add-employee" component={AddEmployee} />
            <Route path="/edit-employee" component={EditEmployee} />
            <Route path="/view-employees" component={ViewEmployees} />
            <Route path="/enter-mobile-number" component={EnterMobile} />
            <Route path="/forgot" component={Forgot} />
            <Route
              path="/time-page"
              render={(props) => (
                <TimePage
                  isLoggedIn={this.state.isLoggedIn}
                  logoutHandler={this.logoutHandler}
                  {...props}
                />
              )}
            />
            <Route
              path="/view-details"
              render={(props) => (
                <ViewEmployee isLoggedIn={this.state.isLoggedIn} {...props} />
              )}
            />
            <Route
              path="/"
              render={(props) => (
                <LoginPage loginHandler={this.loginHandler} {...props} />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
