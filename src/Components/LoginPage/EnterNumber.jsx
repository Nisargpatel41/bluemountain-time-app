import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";

class EnterNumber extends Component {
  state = { errorMessage: false, isSending: false };
  submitForm = async (e) => {
    e.preventDefault();
    this.setState({ isSending: true });

    const userName = e.target.elements.userName.value;
    const mobileNumber = e.target.elements.mobileNumber.value;
    axios
      .post("https://bluemountain-api.herokuapp.com/api/forgot", {
        userName,
        mobileNumber,
      })
      .then((res) => {
        console.log(res.data);

        toast("OTP Sent on Your Mobile!");
        sessionStorage.setItem("empName", userName);
        this.props.history.push("/forgot");
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
    const submitBtnValue = isSending ? "Sending OTP..." : "Send OTP";
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
                <span className="errorMessage">
                  User Name &amp; Mobile Number doesn't match.
                </span>
              )}
              <div className="form-group pt-2">
                <label htmlFor="LoginForm">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  placeholder="Enter Your User Name"
                  autoFocus
                />
              </div>

              <div className="form-group pt-2">
                <label htmlFor="LoginForm">Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="mobileNumber"
                  placeholder="Enter Mobile Number"
                  inputMode="tel"
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

export default EnterNumber;
