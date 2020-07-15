import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

class ViewEmployees extends Component {
  state = { employees: [] };

  componentDidMount() {
    axios
      .get("https://bluemountain-api.herokuapp.com/api/employee")
      .then(({ data }) => {
        this.setState({ employees: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteEmployee = (e) => {
    axios
      .put(
        `https://bluemountain-api.herokuapp.com/api/employee/${e.currentTarget.getAttribute(
          "id"
        )}`
      )
      .then(({ data }) => {
        const deletedEmployee = data;
        const employees = this.state.employees.filter(
          (e) => e._id !== deletedEmployee._id
        );

        this.setState({ employees });
      });
  };

  render() {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin === "false" || isAdmin === null) {
      return <Redirect from={this.props.location.pathname} to="/admin-login" />;
    }

    const { employees } = this.state;
    let countNum = 0;

    const card = employees.map((emp) => {
      countNum += 1;

      return (
        <div key={emp._id} className="card messageCard resultDiv mt-5 pb-2">
          <div className="card-header">BMP Employee {countNum}</div>
          <div className="card-body p-1">
            <table
              className="table table-bordered"
              style={{ overflowX: "scroll" }}
            >
              <tbody>
                <tr>
                  <th scope="row">Employee Name: </th>
                  <td>{emp.userName}</td>
                </tr>
                <tr>
                  <th scope="row">Mobile No: </th>
                  <td>{emp.mobileNo}</td>
                </tr>
                <tr>
                  <th scope="row">BMP Email: </th>
                  <td>{emp.bmpEmail}</td>
                </tr>
                <tr>
                  <th scope="row">Personal Email: </th>
                  <td>{emp.bmpPerEmail}</td>
                </tr>
                <tr>
                  <th scope="row">Current Address: </th>
                  <td>{emp.currAddress}</td>
                </tr>
                <tr>
                  <th scope="row">Permanent Address: </th>
                  <td>{emp.perAddress}</td>
                </tr>
                <tr>
                  <th scope="row">Blood Group: </th>
                  <td>{emp.blood}</td>
                </tr>
                <tr>
                  <th scope="row">Emergancy Contact: </th>
                  <td>{emp.empAltMobile}</td>
                </tr>
                <tr>
                  <th scope="row">Relation: </th>
                  <td>{emp.empRef}</td>
                </tr>
              </tbody>
            </table>
            <div className="text-center">
              <button
                id={emp._id}
                className="btn btn-primary"
                onClick={(e) => {
                  const eid = e.currentTarget.getAttribute("id");
                  sessionStorage.setItem("eid", eid);
                  this.props.history.push("edit-employee");
                }}
              >
                Edit
              </button>
              <button
                id={emp._id}
                onClick={this.deleteEmployee}
                className="btn btn-danger ml-3"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="viewMain">
        <div className="homeBtn" style={{ padding: "2% 0 0 5%" }}>
          <Link to="/admin">
            <i className="fa fa-home homeLink" aria-hidden="true"></i>
          </Link>
        </div>
        {card}
      </div>
    );
  }
}

export default ViewEmployees;
