import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
class ForgotPassword extends Component {
  state = { errorMessage: false, isSending: false };

  submitForm = async (e) => {
    e.preventDefault();
    this.setState({ isSending: true });

    const otpNumber = e.target.elements.otpNumber.value;
    const newPassword = e.target.elements.newPassword.value;

    axios
      .put("https://bluemountain-api.herokuapp.com/api/forgot", {
        empOtp: otpNumber,
        newPassword: newPassword,
        empName: sessionStorage.getItem("empName"),
      })
      .then((res) => {
        toast.success("Password Changed!");
        this.props.history.push("/");
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
    const submitBtnValue = isSending
      ? "Updating Password..."
      : "Update Password";

    return (
      <React.Fragment>
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
                <span className="errorMessage">OTP is Incorrect.</span>
              )}
              <div className="form-group pt-2">
                <label htmlFor="LoginForm">OTP</label>
                <input
                  type="text"
                  className="form-control"
                  id="otpNumber"
                  placeholder="Enter OTP"
                  autocomplete="off"
                  autoFocus
                />
              </div>
              <div className="form-group pt-2">
                <label htmlFor="LoginForm">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  placeholder="Enter New Password"
                />
              </div>
              <div className="form-group pt-3 loginButtonDiv">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value={submitBtnValue}
                  disabled={isSending}
                />
                <button
                  type="button"
                  className="btn btn-secondary ml-4"
                  onClick={() => {
                    this.props.history.push("/");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ForgotPassword;
