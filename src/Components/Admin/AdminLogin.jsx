import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

class AdminLogin extends Component {
  state = { errorMessage: false, isSending: false };

  submitForm = async (e) => {
    e.preventDefault();
    this.setState({ isSending: true });

    const userName = e.target.elements.adminName.value;
    const password = e.target.elements.adminPassword.value;
    axios
      .post("https://bluemountain-api.herokuapp.com/api/admin", {
        userName: userName,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("isAdmin", true);
        this.props.history.push("/admin");
      })
      .catch((error) => {
        if (!error.response.data.resBoolean) {
          this.setState({ errorMessage: true, isSending: false });
        }
      });

    // console.log(result);
  };

  render() {
    const { isSending } = this.state;
    const submitBtnValue = isSending ? "Signing You In..." : "Sign In";

    return (
      <React.Fragment>
        <div>
          <NavLink
            to="/"
            className="forgotPassword"
            style={{ marginTop: "0em" }}
          >
            Employee Login
          </NavLink>
          <div
            className="LoginFormMain"
            style={{ paddingTop: "2em", backgroundColor: "#f7f7f7" }}
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
                    Admin Name and Password Incorrect
                  </span>
                )}
                <div className="form-group pt-2">
                  <label htmlFor="LoginForm">Admin Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="adminName"
                    placeholder="Enter Admin Name"
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
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value={submitBtnValue}
                    disabled={isSending}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminLogin;
