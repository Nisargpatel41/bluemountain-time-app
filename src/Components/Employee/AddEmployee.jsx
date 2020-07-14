import React, { Component } from "react";
import Hr from "../Common/Hr/Hr";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import "./AddEmployee.css";

class AddEmployee extends Component {
  state = { isSending: false };

  submitForm = (e) => {
    e.preventDefault();
    this.setState({ isSending: true });

    const empName = e.target.elements.empName.value;
    e.target.elements.empName.value = "";

    const empPassword = e.target.elements.empPassword.value;
    e.target.elements.empPassword.value = "";

    const empMobile = e.target.elements.empMobile.value;
    e.target.elements.empMobile.value = "";

    axios
      .post("https://bluemountain-api.herokuapp.com/api/employee/add", {
        userName: empName,
        password: empPassword,
        mobileNo: empMobile,
      })
      .then((result) => {
        this.setState({ isSending: false });

        toast.success("Employee Added!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin === "false" || isAdmin === null) {
      return <Redirect from={this.props.location.pathname} to="/admin-login" />;
    }

    const { isSending } = this.state;
    const submitBtnValue = isSending ? "Adding Employee..." : "Add Employee";

    return (
      <React.Fragment>
        <div className="homeBtn" style={{ padding: "2% 0 0 5%" }}>
          <Link to="/admin">
            <i className="fa fa-home homeLink" aria-hidden="true"></i>
          </Link>
        </div>
        <div className="empFormContainer mt-3 text-center ml-auto mr-auto">
          <h3 className="mb-2">Add New Employee</h3>
          <Hr />
          <form onSubmit={this.submitForm}>
            <div className="form-group pt-3">
              <label htmlFor="exampleInputUserName">Enter User Name: </label>
              <input
                type="text"
                className="form-control"
                id="empName"
                name="empName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password:</label>
              <input
                type="password"
                className="form-control"
                id="empPassword"
                name="empPassword"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputMobileNo">Enter Mobile Number:</label>
              <input
                type="text"
                className="form-control"
                id="empMobile"
                name="empMobile"
              />
            </div>

            <input
              type="submit"
              className="btn btn-primary mt-2"
              value={submitBtnValue}
              disabled={isSending}
            />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AddEmployee;
