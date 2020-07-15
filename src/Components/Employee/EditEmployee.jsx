import React, { Component } from "react";
import Hr from "../Common/Hr/Hr";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddEmployee.css";

class EditEmployee extends Component {
  state = {
    employee: {
      userName: "",
      mobileNo: "",
      empEmail: "",
      empperEmail: "",
      currentAddress: "",
      permanentAddress: "",
      empaltMobile: "",
      empRef: "",
      blood: "",
    },
    isSending: false,
  };
  empId = sessionStorage.getItem("eid");

  componentDidMount() {
    axios
      .get(`https://bluemountain-api.herokuapp.com/api/employee/${this.empId}`)
      .then(({ data }) => {
        const employee = {
          userName: data.userName,
          mobileNo: data.mobileNo,
          empEmail: data.bmpEmail,
          empperEmail: data.bmpPerEmail,
          currentAddress: data.currAddress,
          permanentAddress: data.perAddress,
          empaltMobile: data.empAltMobile,
          empRef: data.empRef,
          blood: data.blood,
        };

        this.setState({ employee });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (e) => {
    const employee = { ...this.state.employee };
    employee[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ employee });
  };

  submitForm = (e) => {
    e.preventDefault();
    this.setState({ isSending: true });

    const eid = { eid: this.empId };
    const empObj = { ...this.state.employee, ...eid };
    axios
      .put("https://bluemountain-api.herokuapp.com/api/employee", empObj)
      .then((result) => {
        this.setState({ isSending: false });
        this.props.history.push("/view-employees");
        toast.success("Employee Updated!");
      });
  };

  render() {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin === "false" || isAdmin === null) {
      return <Redirect from={this.props.location.pathname} to="/admin-login" />;
    }

    const { employee, isSending } = this.state;
    const submitBtnValue = isSending
      ? "Updating Employee..."
      : "Update Employee";

    return (
      <React.Fragment>
        <div className="empFormContainer mt-3 text-center ml-auto mr-auto pb-5">
          <h3 className="mb-2">Edit Employee</h3>
          <Hr />
          <form onSubmit={this.submitForm}>
            <div className="form-group pt-3">
              <label htmlFor="exampleInputUserName">Employee Name: </label>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="userName"
                onChange={this.handleChange}
                value={employee.userName}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputMobileNo">Mobile Number:</label>
              <input
                type="text"
                className="form-control"
                id="mobileNo"
                name="mobileNo"
                onChange={this.handleChange}
                value={employee.mobileNo}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputMobileNo">Enter BMP Email:</label>
              <input
                type="email"
                className="form-control"
                id="empEmail"
                name="empEmail"
                onChange={this.handleChange}
                value={employee.empEmail}
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
                onChange={this.handleChange}
                value={employee.empperEmail}
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
                onChange={this.handleChange}
                value={employee.currentAddress}
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
                onChange={this.handleChange}
                value={employee.permanentAddress}
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
                onChange={this.handleChange}
                value={employee.empaltMobile}
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
                onChange={this.handleChange}
                value={employee.empRef}
              />
            </div>

            <div className="form-group ">
              <label htmlFor="exampleInputUserName">Blood Group</label>
              <input
                type="text"
                className="form-control"
                id="blood"
                name="blood"
                onChange={this.handleChange}
                value={employee.blood}
              />
            </div>

            <input
              type="submit"
              className="btn btn-primary mt-2"
              value={submitBtnValue}
              disabled={isSending}
            />
            <button
              type="button"
              className="btn btn-secondary ml-4 mt-2"
              onClick={() => {
                this.props.history.push("/view-employees");
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default EditEmployee;
