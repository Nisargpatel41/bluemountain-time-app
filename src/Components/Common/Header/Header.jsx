import React, { Component } from "react";
import Logo from "./Logo/Logo";

import "./Header.css";

class Header extends Component {
  state = {};

  render() {
    return (
      <div className="header">
        <Logo />
      </div>
    );
  }
}

export default Header;
