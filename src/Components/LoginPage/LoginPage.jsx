import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

class LoginPage extends Component {
  state = { errorMessage: false, isSending: false };

  submitForm = async (e) => {
    e.preventDefault();
    this.setState({ isSending: true });

    const userName = e.target.elements.adminName.value;
    const password = e.target.elements.adminPassword.value;

    axios
      .post("https://bluemountain-api.herokuapp.com/api/employee", {
        userName: userName,
        password: password,
      })
      .then((res) => {
        sessionStorage.setItem("empName", userName);
        localStorage.setItem("isEnterBtn", true);
        localStorage.setItem("isBreakStartBtn", true);

        const remainingMilliseconds = 60 * 60 * 15000;
        // const remainingMilliseconds = 60 * 1000;

        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        // this.props.loggedIn();

        this.props.loginHandler();
        this.props.history.push("/time-page");
      })
      .catch((error) => {
        if (!error.response.data.resBoolean) {
          this.setState({ errorMessage: true, isSending: false });
        }
      });
  };

  forgotPassword = () => {
    axios
      .get("")
      .then((res) => {
        if (res.data) {
          this.props.history.push("/enter-mobile-number");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { isSending } = this.state;
    const submitBtnValue = isSending ? "Logging You In..." : "Login";

    return (
      <React.Fragment>
        <div className="link">
          <NavLink
            to="/admin-login"
            className="forgotPassword"
            style={{ marginTop: "0em", fontSize: "1em" }}
          >
            Admin Login
          </NavLink>
        </div>
        <div
          className="LoginFormMain"
          // style={{ paddingTop: "5em", backgroundColor: "#F2F2F2" }}
        >
          <div
            className="loginFormDiv"
            style={{ backgroundColor: "#fff", height: "auto" }}
          >
            <form
              className="pt-4 pb-4 pl-4 pr-4 formStyles"
              onSubmit={this.submitForm}
            >
              {this.state.errorMessage && (
                <span className="errorMessage">
                  User Name and Password Incorrect
                </span>
              )}
              <div className="form-group pt-2">
                <label htmlFor="LoginForm">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="adminName"
                  placeholder="Enter User Name"
                  autoFocus
                />
              </div>
              <div className="form-group pt-2">
                <label htmlFor="LoginForm">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="adminPassword"
                  placeholder="Enter Password"
                />
              </div>
              <div className="form-group pt-3 loginButtonDiv">
                {/* <button type="submit" className="btn btn-primary">
                  Login
                </button> */}
                <input
                  type="submit"
                  className="btn btn-primary"
                  value={submitBtnValue}
                  disabled={isSending}
                />
                <p className="forgotPassword" onClick={this.forgotPassword}>
                  Forgot Password?
                </p>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginPage;
