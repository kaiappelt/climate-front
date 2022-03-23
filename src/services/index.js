import axios from "axios";

export const zipCodeApi = (zipCode) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://viacep.com.br/ws/${zipCode}/json`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const geolocationApi = (city, uf) => {
  const appId = process.env.REACT_APP_APP_ID;

  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city},${uf},Brazil&limit=5&appid=${appId}`
      )
      .then((response) => {
        resolve(response.data[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const weatherApi = (lat, lon) => {
  const appId = process.env.REACT_APP_APP_ID;

  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${appId}`
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const activitiesApi = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "https://raw.githubusercontent.com/probono-digital/DesafioTecnico/main/MOCK_DATA.json"
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
