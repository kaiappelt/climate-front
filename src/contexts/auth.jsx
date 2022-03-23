import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api, createSession } from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.userData;

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    await createSession(email, password)
      .then((response) => {
        const loggedUser = response.data.user;
        const token = response.data.token;

        localStorage.setItem("userData", JSON.stringify(loggedUser));
        localStorage.setItem("token", JSON.stringify(token));

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(loggedUser);
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          return toast.warning("Incorrect username or password.");
        } else {
          return toast.warning("This action could not be performed.");
        }
      });
  };

  const logout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    setUser(null);

    navigate("/home");
  };
  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
