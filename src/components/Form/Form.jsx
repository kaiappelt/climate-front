import React, { Fragment, useState } from "react";
import "./style.css";
import HomeImg from "../../assets/img/home.png";
import { validation } from "../../assets/helpers";
import { createUser } from "../../api";
import { zipCodeApi, geolocationApi } from "../../services";
import { toast } from "react-toastify";
import Footer from "../Footer/Footer";

const Form = () => {
  const [signUp, setSignUp] = useState("Sign Up");
  const [loadBtn, setLoadBtn] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [zip_code, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [cityError, setCityError] = useState("");
  const [ufError, setUfError] = useState("");

  return (
    <Fragment>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-12 col-xl-4 p-0">
            <div className="card-form">
              <form>
                <div className="row">
                  <div className="col-sm-12 col-md-6 col-xl-12 mb-2">
                    <label htmlFor="name">Username *</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      value={name}
                      autoComplete="off"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <small className="text-danger">{nameError}</small>
                  </div>

                  <div className="col-sm-12 col-md-6 col-xl-12 mb-2">
                    <label htmlFor="text">Email *</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      autoComplete="off"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <small className="text-danger">{emailError}</small>
                  </div>

                  <div className="col-sm-12 col-md-6 col-xl-12 mb-2">
                    <label htmlFor="password">Password *</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      autoComplete="off"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <small className="text-danger">{passwordError}</small>
                  </div>

                  <div className="col-sm-12 col-md-6 col-xl-12 mb-2">
                    <label htmlFor="passwordConfirmation">
                      Password Confirmation *
                    </label>
                    <input
                      type="password"
                      id="passwordConfirmation"
                      className="form-control"
                      value={password_confirmation}
                      autoComplete="off"
                      onChange={(e) => {
                        setPasswordConfirmation(e.target.value);
                      }}
                    />
                    <small className="text-danger">
                      {passwordConfirmationError}
                    </small>
                  </div>

                  <div className="col-sm-12 col-md-6 col-xl-12 mb-2">
                    <label htmlFor="zipCode">Zip Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      className="form-control"
                      value={zip_code}
                      autoComplete="off"
                      onChange={(e) => {
                        setZipCode(e.target.value);
                      }}
                      onKeyUp={(e) => {
                        populateAddress(e.target.value);
                      }}
                    />
                    <small className="text-danger">{zipCodeError}</small>
                  </div>

                  <div className="col-sm-12 col-md-6 col-xl-12 mb-2">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      className="form-control"
                      value={city}
                      autoComplete="off"
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                    <small className="text-danger">{cityError}</small>
                  </div>

                  <div className="col-sm-12 col-md-6 col-xl-12 mb-2">
                    <label htmlFor="uf">UF *</label>
                    <input
                      type="text"
                      id="uf"
                      className="form-control text-uppercase"
                      maxLength={2}
                      value={uf}
                      autoComplete="off"
                      onChange={(e) => {
                        setUf(e.target.value);
                      }}
                    />
                    <small className="text-danger">{ufError}</small>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-6 col-xl-12">
                    <button
                      disabled={loadBtn}
                      onClick={handleRegister}
                      type="button"
                      className="btn btn-handle-insert"
                    >
                      {signUp}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="d-none d-xl-flex col-xl-8 justify-content-end align-items-center">
            <img src={HomeImg} alt="" />
          </div>
        </div>
      </div>
      <div className="container-fluid p-0 m-0">
        <Footer />
      </div>
    </Fragment>
  );

  async function handleRegister(e) {
    e.preventDefault();

    handleValidation();

    if (validation.run()) {
      setLoadBtn(true);
      setSignUp("Loading...");

      const geoLocationData = await getGeolocationData(city, uf);

      const { lat, lon } = geoLocationData;

      const data = {
        name,
        email,
        password,
        password_confirmation,
        zip_code,
        city,
        uf,
        lat,
        lon,
      };

      await createUser(data)
        .then((response) => {
          console.log(response);

          if (response.status === 200) {
            handleClear();
            return toast.success("Success!");
          }
        })
        .catch((error) => {
          if (error.request.status === 412) {
            return toast.warning("This email already exists.");
          }

          return toast.warning("This action could not be performed.");
        });

      setLoadBtn(false);
      setSignUp("Sign up");
    } else {
      handleValidationError();
    }
  }

  async function populateAddress(zipCode) {
    if (zipCode.length === 8) {
      zipCode = zipCode.replace(/\D/g, "");

      await zipCodeApi(zipCode)
        .then((res) => {
          setCity(res.localidade);
          setUf(res.uf);
        })
        .catch(() => {
          return toast.warning("Error requesting zip code data.");
        });
    }
  }

  async function getGeolocationData(city, uf) {
    if (!city || !uf) {
      return toast.warning("Error requesting geolocation data.");
    }

    let geolocationData = {};

    await geolocationApi(city, uf)
      .then((response) => {
        geolocationData = response;
      })
      .catch(() => {
        return toast.warning("Error requesting geolocation data.");
      });

    return geolocationData;
  }

  function handleValidation() {
    validation.setRules(name, "name", "Username", 3);
    validation.setRules(password, "password", "Password", 6);
    validation.setRules(zip_code, "zipCode", "Zip Code");
    validation.setRules(city, "city", "City");
    validation.setRules(uf, "uf", "UF");

    validation.handleValidateEmail(email);
    validation.confirmPasswords(
      password,
      password_confirmation,
      "passwordConfirmation"
    );
  }

  function handleValidationError() {
    setNameError(validation.errors.name);
    setEmailError(validation.errors.email);
    setPasswordError(validation.errors.password);
    setPasswordConfirmationError(validation.errors.passwordConfirmation);
    setZipCodeError(validation.errors.zipCode);
    setCityError(validation.errors.city);
    setUfError(validation.errors.uf);
  }

  function handleClear() {
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
    setZipCode("");
    setCity("");
    setUf("");

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setPasswordConfirmationError("");
    setZipCodeError("");
    setCityError("");
    setUfError("");
  }
};

export default Form;
