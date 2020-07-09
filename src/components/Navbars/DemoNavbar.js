import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Navbar,
  NavbarBrand,
  NavItem,
  Container,
  Button,
  Col,
} from "reactstrap";

class DemoNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom pt-4"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require("assets/img/brand/logo-white.png")}
                />
              </NavbarBrand>
              <NavItem className="d-none d-lg-block ml-lg-4">
                    <Link
                    to="/solicitudes-auxilio"
                    >
                    <span className="nav-link-inner--text text-white ">Admin</span>

                    </Link>
                  </NavItem>
              </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;
