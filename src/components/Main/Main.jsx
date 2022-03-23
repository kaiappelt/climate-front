import React, { Fragment } from "react";
import "./style.css";
import HomeImg from "../../assets/img/home.png";
import RegisterLink from "../RegisterLink/RegisterLink";
import Footer from "../Footer/Footer";

const Main = () => {
  return (
    <Fragment>
      <div className="container custom-main">
        <div className="row">
          <div className="col-12 col-lg-4">
            <div className="text-home">
              <h2>
                Get out of boredom with <br />
                <span className="text-logo">Climate</span>
              </h2>
              <p>
                Our goal is to improve your mental health by suggesting
                activities.
              </p>
              <RegisterLink />
            </div>
          </div>
          <div className="d-none d-lg-flex col-lg-8 justify-content-end align-items-center">
            <div className="img-home">
              <img src={HomeImg} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid p-0 m-0">
        <Footer />
      </div>
    </Fragment>
  );
};

export default Main;
