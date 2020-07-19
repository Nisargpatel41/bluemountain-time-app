import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

class ViewEmployee extends Component {
  state = { employee: {}, empName: sessionStorage.getItem("empName") };
  //
  componentDidMount() {
    axios
      .get(
        `https://bluemountain-api.herokuapp.com/api/employee/byName/${this.state.empName}`
      )
      .then(({ data }) => {
        this.setState({ employee: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "false" || isLoggedIn === null) {
      return <Redirect from={this.props.location.pathname} to="/" />;
    }

    const { employee } = this.state;

    return (
      <div className="viewMain">
        <div className="homeBtn" style={{ padding: "2% 0 0 5%" }}>
          <Link to="/time-page">
            <i className="fa fa-home homeLink" aria-hidden="true"></i>
          </Link>
        </div>
        <div className="card messageCard resultDiv mt-5 pb-2">
          <div className="card-header">Details</div>
          <div className="card-body p-1">
            <table
              className="table-responsive-sm table table-bordered tableStyle"
              // style={{ overflowX: "scroll" }}
            >
              <tbody>
                <tr>
                  <th scope="row">User Name: </th>
                  <td>{employee.userName}</td>
                </tr>
                <tr>
                  <th scope="row">Employee Name: </th>
                  <td>{employee.empName}</td>
                </tr>
                <tr>
                  <th scope="row">Mobile No: </th>
                  <td>{employee.mobileNo}</td>
                </tr>
                <tr>
                  <th scope="row">BMP Email: </th>
                  <td>{employee.bmpEmail}</td>
                </tr>
                <tr>
                  <th scope="row">Personal Email: </th>
                  <td>{employee.bmpPerEmail}</td>
                </tr>
                <tr>
                  <th scope="row">Current Address: </th>
                  <td>{employee.currAddress}</td>
                </tr>
                <tr>
                  <th scope="row">Permanent Address: </th>
                  <td>{employee.perAddress}</td>
                </tr>
                <tr>
                  <th scope="row">Blood Group: </th>
                  <td>{employee.blood}</td>
                </tr>
                <tr>
                  <th scope="row">Emergancy Contact: </th>
                  <td>{employee.empAltMobile}</td>
                </tr>
                <tr>
                  <th scope="row">Relation: </th>
                  <td>{employee.empRef}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewEmployee;
