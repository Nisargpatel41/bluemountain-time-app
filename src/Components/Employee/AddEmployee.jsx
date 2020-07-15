import React, { Component } from "react";
import Hr from "../Common/Hr/Hr";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import "./AddEmployee.css";
import { trim } from "jquery";

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

    const empEmail = e.target.elements.empEmail.value;
    e.target.elements.empEmail.value = "";

    const empperEmail = e.target.elements.empperEmail.value;
    e.target.elements.empperEmail.value = "";

    const currentAddress = trim(e.target.elements.currentAddress.value);
    e.target.elements.currentAddress.value = "";

    const permanentAddress = trim(e.target.elements.permanentAddress.value);
    e.target.elements.permanentAddress.value = "";

    const empaltMobile = e.target.elements.empaltMobile.value;
    e.target.elements.empaltMobile.value = "";

    const empRef = e.target.elements.empRef.value;
    e.target.elements.empRef.value = "";

    const blood = e.target.elements.blood.value;
    e.target.elements.blood.value = "";

    // https://bluemountain-api.herokuapp.com
    axios
      .post("http://localhost:5000/api/employee/add", {
        userName: empName,
        password: empPassword,
        mobileNo: empMobile,
        bmpEmail: empEmail,
        bmpPerEmail: empperEmail,
        currAddress: currentAddress,
        perAddress: permanentAddress,
        empAltMobile: empaltMobile,
        empRef: empRef,
        blood: blood,
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
              <label htmlFor="exampleInputUserName">Enter Name: </label>
              <input
                type="text"
                className="form-control"
                id="empName"
                name="empName"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Enter Password:</label>
              <input
                type="password"
                className="form-control"
                id="empPassword"
                name="empPassword"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputMobileNo">Enter Mobile Number:</label>
              <input
                type="text"
                className="form-control"
                id="empMobile"
                name="empMobile"
                inputMode="tel"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputMobileNo">Enter BMP Email:</label>
              <input
                type="email"
                className="form-control"
                id="empEmail"
                name="empEmail"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputMobileNo">
                Enter Personal Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="empperEmail"
                name="empperEmail"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputMobileNo">
                Enter current Address:
              </label>
              <textarea
                name="currentAddress"
                id="currentAddress"
                // cols="30"
                rows="4"
                className="form-control"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputMobileNo">
                Enter Permanent Address:
              </label>
              <textarea
                name="permanentAddress"
                id="permanentAddress"
                // cols="30"
                rows="4"
                className="form-control"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputMobileNo">
                Enter Emergency Number:
              </label>
              <input
                type="text"
                className="form-control"
                id="empaltMobile"
                name="empaltMobile"
                inputMode="tel"
              />
            </div>

            <div className="form-group ">
              <label htmlFor="exampleInputUserName">
                Relation With Emergency Number:
              </label>
              <input
                type="text"
                className="form-control"
                id="empRef"
                name="empRef"
              />
            </div>

            <div className="form-group ">
              <label htmlFor="exampleInputUserName">Blood Group</label>
              <input
                type="text"
                className="form-control"
                id="blood"
                name="blood"
              />
            </div>

            <input
              type="submit"
              className="btn btn-primary mt-2 mb-5"
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
