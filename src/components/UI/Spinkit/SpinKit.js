import React from "react";

import Backdrop from "./Backdrop";
import "./SpinKit.css";

function SpinKit() {
  return (
    <Backdrop>
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
    </Backdrop>
  );
}

export default SpinKit;
