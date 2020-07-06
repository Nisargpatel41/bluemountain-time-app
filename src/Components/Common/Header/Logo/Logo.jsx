import React from "react";
import logoImg from "./logo.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logoDiv">
      <img src={logoImg} alt="Logo" />
    </div>
  );
};

export default Logo;
