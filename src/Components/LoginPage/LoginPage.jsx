import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./LoginPage.css";

class LoginPage extends Component {
  state = { errorMessage: false };

  submitForm = async (e) => {
    e.preventDefault();
    const userName = e.target.elements.adminName.value;
    const password = e.target.elements.adminPassword.value;

    // console.log(result);
  };

  forgotPassword = () => {
    axios
      .get("")
      .then((res) => {
        if (res.data) {
          toast("OTP Sent on Your Mobile!");
          this.props.history.push("/forgot");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
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
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
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
