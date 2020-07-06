import React from "react";
import HR from "../Hr/Hr";
import "./InnerTitle.css";

const InnerTitle = (props) => {
  return (
    <div className="innerTitleMain">
      <div className="innerTitleDiv">
        <h5 className="innerTitle">{props.title}</h5>
        <HR />
      </div>
    </div>
  );
};

export default InnerTitle;
