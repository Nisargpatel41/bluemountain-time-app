import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Hr from "../Common/Hr/Hr";
import "./Admin.css";

class Admin extends Component {
  state = {};

  render() {
    // if (!this.props.isAuth) {
    //   return <Redirect from={this.props.location.pathname} to="/login" />;
    // }

    return (
      <React.Fragment>
        <Hr />
        <div className="navContainer">
          <nav class="navbar navbar-expand-lg navbar-light bg-light text-center">
            <Link class="navbar-brand ml-auto mr-auto" to="/add-employee">
              Add Employee
            </Link>
          </nav>
        </div>

        <form className="text-center mt-3">
          <div className="form-group">
            <label for="exampleInputDate text-left">
              Please Enter the date:
            </label>
            <input
              type="date"
              className="form-control dateInput mt-1 ml-auto mr-auto p-auto"
              id="exampleInputDate"
              aria-describedby="dateHelp"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        <div className="downloadContainer text-center mt-4">
          <button className="btn btn-success">Download File</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Admin;
