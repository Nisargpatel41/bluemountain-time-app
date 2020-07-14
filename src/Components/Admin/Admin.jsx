import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Hr from "../Common/Hr/Hr";
import "./Admin.css";

class Admin extends Component {
  state = {
    notFound: true,
    isSearched: false,
  };

  submitForm = (e) => {
    e.preventDefault();
    // const d = new Date(e.currentTarget.elements.dates.value);
    axios
      .post("https://bluemountain-api.herokuapp.com/api/admin/search-record", {
        // date: d.toLocaleDateString(),
        date: e.currentTarget.elements.dates.value,
      })
      .then(({ data }) => {
        this.setState({ isSearched: true, notFound: false });
      })
      .catch((err) => {
        this.setState({ isSearched: true, notFound: true });
      });
  };

  downloadFile = () => {
    window.open(
      "https://bluemountain-api.herokuapp.com/api/admin/download-file"
    );
  };

  render() {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin === "false" || isAdmin === null) {
      return <Redirect from={this.props.location.pathname} to="/admin-login" />;
    }

    const lastPart = () => {
      if (!this.state.notFound)
        return (
          <div className="downloadContainer text-center mt-4">
            <button className="btn btn-success" onClick={this.downloadFile}>
              Download File
            </button>
          </div>
        );
      else
        return (
          <div className="downloadContainer text-center mt-4">
            <span className="errorMessage">Record Not Found.</span>
          </div>
        );
    };

    return (
      <React.Fragment>
        <Link
          to="/admin-login"
          className="ml-3 mt-2"
          onClick={() => {
            localStorage.setItem("isAdmin", false);
          }}
        >
          Logout
        </Link>
        <Hr />
        <div className="navContainer">
          <nav className="navbar navbar-expand-lg navbar-light bg-light text-center">
            <Link className="navbar-brand ml-auto mr-auto" to="/add-employee">
              Add Employee
            </Link>
            <Link className="navbar-brand ml-auto mr-auto" to="/view-employees">
              View Employees
            </Link>
          </nav>
        </div>

        <form className="text-center mt-3" onSubmit={this.submitForm}>
          <div className="form-group pt-3">
            <label htmlFor="exampleInputDate text-left">
              Please Enter the date:
            </label>
            <input
              type="date"
              className="form-control dateInput mt-1 ml-auto mr-auto p-auto"
              id="exampleInputDate"
              aria-describedby="dateHelp"
              name="dates"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        {this.state.isSearched && lastPart()}
      </React.Fragment>
    );
  }
}

export default Admin;
