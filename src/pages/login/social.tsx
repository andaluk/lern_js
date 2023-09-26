import React from "react";
import "./social.scss";

const Sa = ({ href = "#", className = "" }) => {
  return (
    <a href={href} className="social">
      <i className={`fab ${className}`} />
    </a>
  );
};

export const Social = () => {
  return (
    <div className="social-container">
      <Sa className="fa-facebook-f" />
      <Sa className="fa-google-plus-g" />
      <Sa className="fa-linkedin-in" />
    </div>
  );
};
