import React, { Fragment, useContext, useEffect, useState } from "react";
import Moment from "react-moment";
import "moment-timezone";
import "./style.css";
import { IoMdContact } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { BsFillCloudRainFill } from "react-icons/bs";
import { AuthContext } from "../../../../contexts/auth";

const Weather = (props) => {
  const { logout } = useContext(AuthContext);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.userData);

    setUserName(user.name);
  }, []);

  function handleLogout(e) {
    e.preventDefault();

    logout();
  }
  return (
    <Fragment>
      <div className="area-weather">
        <div className="user-data">
          <div className="d-flex align-items-center">
            <IoMdContact className="user-icon" />
            <h4>{userName}</h4>
          </div>
          <span onClick={handleLogout} className="user-icon">
            <FiLogOut />
          </span>
        </div>

        <div className="h-100 d-flex flex-column justify-content-center align-items-center">
          <div className="weather-data">
            <div className="d-flex justify-content-center align-items-center">
              <BsFillCloudRainFill className="icon-weather" />

              <div className="d-flex flex-column align-items-start">
                <h4>Today</h4>
                <p>
                  <Moment format="LL" />
                </p>
              </div>
            </div>

            <div>
              <h2>{Math.round(props.weather.temp)}°</h2>
              <p>{props.weather.city}</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Weather;
