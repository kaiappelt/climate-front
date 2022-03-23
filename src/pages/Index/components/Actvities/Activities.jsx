import React, { Fragment, useContext } from "react";
import "./style.css";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../../../contexts/auth";

const Activities = (props) => {
  const { logout } = useContext(AuthContext);

  function handleLogout(e) {
    e.preventDefault();

    logout();
  }

  return (
    <Fragment>
      <div className="row activities">
        <div className="col-12 mb-5">
          <div className="title d-flex justify-content-between">
            <h1>What can do you today?</h1>
            <span onClick={handleLogout} className="logout-icon">
              <FiLogOut />
            </span>
          </div>
        </div>

        {props.activities.map((activity) => (
          <div key={activity.id} className="col-12 col-xl-6 mb-4">
            <div className="custom-card">
              <div className="d-flex align-items-center mb-4">
                <BsFillBookmarkStarFill className="icon-card" />
                <h3 className="m-0">{activity.activity_title}</h3>
              </div>
              <h5 className="mb-2">{`${activity.requisites.cost || ""}`}</h5>
              <p>
                {`${activity.requisites.participants_number} participante(s)`}
              </p>

              <span className="d-flex mt-2">
                <h5>Location:&nbsp;</h5>
                <p>{activity.suggested_location}</p>
              </span>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Activities;
