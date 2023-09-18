import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="links">
        <a href="https://github.com/Jlh77/connex-one-tech-test-client">
          Frontend
        </a>
        <a href="https://github.com/Jlh77/connex-one-tech-test-server/blob/main/server.ts">
          Backend
        </a>
      </div>

      <div className="name">
        <p>Created By Joseph Hawkins</p>
      </div>
    </footer>
  );
};

export default Footer;
