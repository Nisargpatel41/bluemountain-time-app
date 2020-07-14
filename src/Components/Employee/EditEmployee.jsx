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

    axios.put("http://localhost:5000/api/employee", empObj).then((result) => {
      this.setState({ isSending: false });
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
        <div className="empFormContainer mt-3 text-center ml-auto mr-auto">
          <h3 className="mb-2">Edit Employee</h3>
          <Hr />
          <form onSubmit={this.submitForm}>
            <div className="form-group pt-3">
              <label htmlFor="exampleInputUserName">User Name: </label>
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

export default EditEmployee;
