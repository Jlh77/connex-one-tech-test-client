import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="spinner-container" style={{ height: "20rem" }}>
      <div className="loading-spinner"></div>
    </div>
  );
};
export default Loading;
