import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { validation } from "../../assets/helpers";
import "./style.css";
import LogoImg from "../../assets/img/logo-climate-login.png";
import { AuthContext } from "../../contexts/auth";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [signIn, setSignIn] = useState("Sign In");
  const [loadBtn, setLoadBtn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      return toast.warning("Incorrect username or password!");
    }
    if (validation.handleValidateEmail(email)) {
      return toast.warning("Invalid email!");
    }

    setLoadBtn(true);
    setSignIn("Loading...");

    await login(email, password);

    setLoadBtn(false);
    setSignIn("Sign in");
  }

  return (
    <Fragment>
      <div className="container mt-5">
        <div className="login-card">
          <div className="text-logo">
            <img src={LogoImg} alt="" />
          </div>
          <div className="text-title">
            <h1>Sign in to Climate!</h1>
          </div>
          <form className="w-100" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                className="form-control"
                autoComplete="off"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                className="form-control"
                autoComplete="off"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <button disabled={loadBtn} type="submit" className="btn">
              {signIn}
            </button>
          </form>

          <div className="text-footer">
            <p>New to Climate?</p>
            <Link to={"/register"}>Create an account!</Link>
            <hr />
            <Link to={"/home"}>Return to Home!</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
