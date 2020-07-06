import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./Admin.css";

class Admin extends Component {
  state = {};

  render() {
    // if (!this.props.isAuth) {
    //   return <Redirect from={this.props.location.pathname} to="/login" />;
    // }

    return (
      <React.Fragment>
        <h1>hello</h1>
        <h2>world</h2>
      </React.Fragment>
    );
  }
}

export default Admin;
