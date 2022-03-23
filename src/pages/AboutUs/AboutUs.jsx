import React, { Fragment } from "react";
import "./style.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { BsPeopleFill } from "react-icons/bs";
import { BsPinMapFill } from "react-icons/bs";
import { BsFillHandThumbsUpFill } from "react-icons/bs";

const AboutUs = () => {
  return (
    <Fragment>
      <NavBar />

      <div className="container custom-main">
        <div className="row">
          <div className="col-12 text-center">
            <h2>
              Bem vindo ao&nbsp;
              <span className="text-logo">Climate</span>
            </h2>
          </div>
          <div className="col-12 ps-5 pe-5">
            <p className="text">
              Somos uma plataforma de que visa sugerir atividades de
              entretenimento, de acordo com o clima da sua região. Desta forma
              procuramos ajudar a melhorar a sua saúde mental através de
              atividades.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-6 col-xl-4 text-center">
            <BsPeopleFill className="icons" />
            <p className="text">
              Climate é feito por pessoas que têm um desejo em comum:
              revolucionar o universo da diversão planejada.
            </p>
          </div>
          <div className="col-12 col-lg-6 col-xl-4 text-center">
            <BsPinMapFill className="icons" />
            <p className="text">
              Aumente o conhecimento dos locais, referente ao clima e a gostos
              pessoais.
            </p>
          </div>
          <div className="col-12 col-lg-6 col-xl-4 text-center">
            <BsFillHandThumbsUpFill className="icons" />
            <p className="text">
              Seja um dos mais de X clientes que aprovam nosso negócio
            </p>
          </div>
        </div>
      </div>

      <div className="container-fluid p-0 m-0">
        <Footer />
      </div>
    </Fragment>
  );
};

export default AboutUs;
