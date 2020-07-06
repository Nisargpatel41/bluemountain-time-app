import React from "react";
import "./SectionTitle.css";

const SectionTitle = (props) => {
  return (
    <div className="sectionTitleMain">
      <div className="sectionTitleDiv">
        <h4 className="sectionTitle">{props.title}</h4>
      </div>
    </div>
  );
};

export default SectionTitle;
