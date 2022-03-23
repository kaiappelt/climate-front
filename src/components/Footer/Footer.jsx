import React, { Fragment } from "react";
import "./style.css";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <Fragment>
      <footer className="custom-footer">
        <div className="icons-footer">
          <BsFacebook className="me-3" />
          <AiFillInstagram className="me-3" />
          <BsLinkedin className="me-3" />
          <FaGithub />
        </div>
        <div className="copy-footer">
          <p>Climate 2022 ©</p>
        </div>
      </footer>
    </Fragment>
  );
};
export default Footer;
