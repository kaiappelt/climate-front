import React, { Fragment, useEffect, useState } from "react";
import Activities from "./components/Actvities/Activities";
import Weather from "./components/Weather/Weather";
import Footer from "../../components/Footer/Footer";
import styled from "styled-components";
import { weatherApi, activitiesApi } from "../../services";
import { toast } from "react-toastify";

const IndexStyle = styled.div`
  height: 100%;
  background-color: #fafafa;
`;

const Index = () => {
  const [activities, setActivities] = useState([]);
  const [temp, setTemp] = useState("");
  const [city, setCity] = useState("");

  useEffect(async () => {
    let openWeather = [];
    let activities = [];

    const user = await JSON.parse(localStorage.userData);

    await weatherApi(user.lat, user.lon)
      .then((response) => {
        openWeather = response.data;
      })
      .catch(() => {
        return toast.warning("Error requesting weather data");
      });

    await activitiesApi()
      .then((response) => {
        activities = response.data;
      })
      .catch(() => {
        return toast.warning("Error requesting activities data");
      });

    activities = activities.filter((activitie) => {
      return (
        activitie.suggested_weather_conditions == openWeather.weather[0].main
      );
    });

    setActivities(activities);
    setTemp(openWeather.main.temp);
    setCity(openWeather.name);
  }, []);

  return (
    <Fragment>
      <IndexStyle>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-8">
              <Activities activities={activities} />
            </div>
            <div className="col-12 col-md-4 p-0">
              <Weather weather={{ temp, city }} />
            </div>
          </div>
          <div className="row">
            <Footer />
          </div>
        </div>
      </IndexStyle>
    </Fragment>
  );
};

export default Index;
