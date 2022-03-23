import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const createSession = async (email, password) => {
  return new Promise((resolve, reject) => {
    api
      .post("/login", { email, password })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createUser = (user) => {
  return new Promise((resolve, reject) => {
    api
      .post("/users", user)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
