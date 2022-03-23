import React, { Fragment } from "react";
import "./style.css";
import logo from "../../assets/img/logo-climate.png";
import RegisterLink from "../RegisterLink/RegisterLink";
import { Link } from "react-router-dom";
import { Container, Form, Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
    <Fragment>
      <Navbar className="pd-nav" bg="white" expand="sm">
        <Container>
          <Navbar.Brand>
            <Link to={"/home"}>
              <img className="img-nav" src={logo} alt="" />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle
            className="btn-toggle-custom"
            aria-controls="navbarScroll"
          />

          <Navbar.Collapse className="mt-3" id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link className="item-nav" to={"/about-us"}>
                About
              </Link>
            </Nav>

            <Form className="d-flex text-end">
              <span className="link-register">
                <RegisterLink />
              </span>
              <Link to={"/login"} className="item-nav">
                Sign in
              </Link>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default NavBar;
