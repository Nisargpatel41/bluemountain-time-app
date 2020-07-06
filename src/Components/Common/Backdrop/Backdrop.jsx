import React from "react";
import "./Backdrop.css";
const Backdrop = (props) => {
  const myClass = props.imageModal ? "backdrop" : "backdrop none";

  return (
    <div
      className={myClass}
      onClick={() => {
        props.imageZoomCloser();
      }}
    ></div>
  );
};

export default Backdrop;
