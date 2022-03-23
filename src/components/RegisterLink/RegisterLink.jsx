import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const RegisterLink = () => {
  return (
    <Fragment>
      <Link to={"/register"} className="btn-register">
        Sign up
      </Link>
    </Fragment>
  );
};

export default RegisterLink;
